import AccountDeletion from './account-deletion';
import SoundSettings from './sound-settings';
import {ensureNotificationChannels} from './sounds';
import {useEffect,useRef,useState} from 'react';
import {Capacitor} from '@capacitor/core';
import {PushNotifications} from '@capacitor/push-notifications';
import {apiFetch} from './lib/api';
import {PrivateImage} from './lib/private-media';
import {capturePhoto,scheduleReminders,cancelReminders} from './native';
import {auth} from './lib/firebase';
let registeredToken='';
async function post(body:any){const r=await apiFetch('/api/mobile',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});if(!r.ok)throw Error('No se pudo registrar el teléfono.');return r}
export async function cleanupDevice(){
 // Removing the token first prevents the next signed-in customer from inheriting notices.
 if(registeredToken)try{await post({action:'unregister',token:registeredToken})}catch{}
 if(Capacitor.isNativePlatform()){try{await PushNotifications.unregister()}catch{}await cancelReminders().catch(()=>{})}
 registeredToken='';
}
export default function MobilePanel(){
 const [status,setStatus]=useState(''),[data,setData]=useState<any>(null),[photos,setPhotos]=useState<any[]>([]),[sharing,setSharing]=useState('private'),[text,setText]=useState(''),[busy,setBusy]=useState(false),[draft,setDraft]=useState<{id:string,blob:Blob}|null>(null);
 const listeners=useRef<any[]>([]),mounted=useRef(true);
 async function load(){const [r,p]=await Promise.all([apiFetch('/api/mobile'),apiFetch('/api/photos')]);if(r.ok)setData(await r.json());if(p.ok)setPhotos((await p.json()).photos)}
 useEffect(()=>{mounted.current=true;load().catch(()=>{});const t=setInterval(()=>{if(document.visibilityState==='visible')load().catch(()=>{})},30000);return()=>{mounted.current=false;clearInterval(t);listeners.current.forEach(l=>l.remove());listeners.current=[]}},[]);
 async function enablePush(){if(!Capacitor.isNativePlatform()){setStatus('Abrí la aplicación Android para activar avisos push.');return}setBusy(true);try{
  const permission=await PushNotifications.requestPermissions();if(permission.receive!=='granted')throw Error('Autorizá las notificaciones en los ajustes de Android.');
  await ensureNotificationChannels();
  if(!listeners.current.length){
   listeners.current.push(await PushNotifications.addListener('registration',async token=>{registeredToken=token.value;try{await post({action:'register',token:token.value});setStatus('Teléfono registrado. Verificá el estado del servicio y probá con tu contacto.');await load()}catch(e){setStatus(String(e))}}));
   listeners.current.push(await PushNotifications.addListener('registrationError',()=>setStatus('Firebase no pudo registrar este teléfono. Revisá google-services.json y la conexión.')));
   listeners.current.push(await PushNotifications.addListener('pushNotificationReceived',()=>{setStatus('Hay una actualización en tu círculo.');load().catch(()=>{})}));
   listeners.current.push(await PushNotifications.addListener('pushNotificationActionPerformed',async event=>{const id=event.notification.data?.jobId;if(id)await post({action:'opened',id}).catch(()=>{});window.dispatchEvent(new CustomEvent('sos:action',{detail:event.notification.data?.screen==='support'?'support':'activity'}));load().catch(()=>{})}));
  }
  await PushNotifications.register();
 }catch(e){setStatus(e instanceof Error?e.message:String(e))}finally{setBusy(false)}}
 useEffect(()=>{if(!Capacitor.isNativePlatform())return;PushNotifications.checkPermissions().then(p=>{if(p.receive==='granted'&&mounted.current)enablePush()}).catch(()=>{})},[]);
 async function reminders(){setBusy(true);try{const [a,b]=await Promise.all([apiFetch('/api/care'),apiFetch('/api/circle')]);if(!a.ok||!b.ok)throw Error('No se pudieron leer tus recordatorios.');const count=await scheduleReminders(await a.json(),await b.json());localStorage.setItem('sos-reminders:'+auth?.currentUser?.uid,'on');setStatus(`${count} recordatorios preparados. Agua: próximos 7 días. Sincronizá nuevamente si cambiás la agenda.`)}catch(e){setStatus(e instanceof Error?e.message:String(e))}finally{setBusy(false)}}
 useEffect(()=>{let timer:ReturnType<typeof setTimeout>;const sync=()=>{if(localStorage.getItem('sos-reminders:'+auth?.currentUser?.uid)==='on'){clearTimeout(timer);timer=setTimeout(()=>{reminders().catch(()=>{})},1200)}};sync();window.addEventListener('sos:data-updated',sync);return()=>{clearTimeout(timer);window.removeEventListener('sos:data-updated',sync)}},[]);
 async function photograph(){setBusy(true);try{setDraft({id:crypto.randomUUID(),blob:await capturePhoto()});setStatus('Foto tomada. Elegí el permiso y confirmá Guardar.')}catch{setStatus('No se tomó la foto. Revisá el permiso de cámara o volvé a intentar.')}finally{setBusy(false)}}
 async function savePhoto(){if(!draft)return;setBusy(true);try{const r=await apiFetch(`/api/photos?id=${draft.id}&sharing=${sharing}&text=${encodeURIComponent(text)}`,{method:'POST',headers:{'Content-Type':'image/jpeg'},body:draft.blob,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error((await r.json()).error);setDraft(null);setText('');setStatus('Foto guardada.');await load()}catch(e){setStatus((e instanceof Error?e.message:String(e))+' La foto sigue aquí para reintentar.')}finally{setBusy(false)}}
 return <details className="mobile-panel" id="mobile-tools"><summary>Mi teléfono · Avisos, recordatorios y fotos guardadas</summary><div className="panel-content"><p>Servicio de avisos: <strong>{data?.pushConfigured?'configurado':'pendiente de configuración'}</strong>. Aceptado por Firebase no significa recibido ni visto por tu contacto.</p><div><button className="button primary" disabled={busy} onClick={enablePush}>Activar avisos en este teléfono</button><button className="button outline" disabled={busy} onClick={reminders}>Sincronizar agua y agenda</button><button className="text-link" disabled={busy} onClick={async()=>{await cancelReminders();localStorage.removeItem('sos-reminders:'+auth?.currentUser?.uid);setStatus('Recordatorios locales cancelados.')}}>Cancelar recordatorios locales</button></div><p>Android puede retrasar recordatorios por ahorro de batería. Reabrí la app después de forzar su cierre. Los accesos rápidos abren la confirmación SOS; no activan una cámara oculta.</p>
 <SoundSettings/><AccountDeletion/><h3>Fotos de tu entorno</h3><textarea maxLength={1000} placeholder="Descripción opcional" value={text} onChange={e=>setText(e.target.value)}/><label>Permiso de la foto <select value={sharing} onChange={e=>setSharing(e.target.value)}><option value="private">Solo yo</option><option value="now">Mi círculo, desde ahora</option><option value="sos">Mi círculo, al confirmar un SOS</option></select></label><div><button className="button outline" disabled={busy} onClick={photograph}>Tomar foto</button>{draft&&<><button className="button primary" disabled={busy} onClick={savePhoto}>Guardar foto</button><button className="text-link" disabled={busy} onClick={()=>setDraft(null)}>Descartar</button></>}</div>
 <p role="status" className="native-status">{status}</p>
 {photos.map(p=><article key={p.id}><PrivateImage src={'/api/photos?id='+p.id} className="native-photo" alt="Foto compartida con permiso"/><p>{p.text||'Foto del entorno'} · {new Date(p.created).toLocaleString()}</p>{p.user_id===auth?.currentUser?.uid&&<><button className="text-link" onClick={async()=>{await apiFetch('/api/photos?id='+p.id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'private'})});await load()}}>Dejar privada</button> · <button className="text-link" onClick={async()=>{if(window.confirm('¿Eliminar esta foto guardada?')){await apiFetch('/api/photos?id='+p.id,{method:'DELETE'});await load()}}}>Eliminar</button></>}</article>)}
 <h3>Avisos para tus contactos</h3>{!data?.outgoing?.length&&<p>Todavía no hay avisos tuyos en la cola del servicio.</p>}{data?.outgoing?.slice(0,8).map((j:any)=><p key={j.id}>{j.name} · {new Date(j.created).toLocaleString()} · {j.opened_at?'Abrió el aviso':({queued:'Pendiente',retry:'Pendiente de envío',accepted:'Aceptado por Firebase',cancelled:'Resuelto o permiso revocado',expired:'Vencido'} as any)[j.status]}{j.last_error==='NO_REGISTERED_DEVICE'?' · Sin teléfono registrado':''}{j.last_error==='PUSH_DISABLED'?' · Servicio sin activar':''}</p>)}<h3>Estado de tus últimos avisos</h3>{!data?.jobs?.length&&<p>Todavía no hay avisos dirigidos a vos.</p>}{data?.jobs?.slice(0,8).map((j:any)=><p key={j.id}>{new Date(j.created).toLocaleString()} · {j.kind} · {j.opened_at?'Abierto':({queued:'Pendiente',retry:'Pendiente de envío',accepted:'Aceptado por Firebase',cancelled:'Resuelto o permiso revocado',expired:'Vencido'} as any)[j.status]}{j.last_error==='NO_REGISTERED_DEVICE'?' · Sin teléfono registrado':''}</p>)}</div></details>
}
