import {ensureNotificationChannels,soundProfile} from './sounds';
import {Capacitor} from '@capacitor/core';
import {App} from '@capacitor/app';
import {Camera,CameraResultType,CameraSource} from '@capacitor/camera';
import {Geolocation} from '@capacitor/geolocation';
import {LocalNotifications} from '@capacitor/local-notifications';
import {Browser} from '@capacitor/browser';
export const isAndroid=()=>Capacitor.getPlatform()==='android';
export async function currentLocation(){
 if(Capacitor.isNativePlatform()){await Geolocation.requestPermissions();return Geolocation.getCurrentPosition({enableHighAccuracy:true,timeout:15000,maximumAge:0})}
 return new Promise<GeolocationPosition>((resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject,{enableHighAccuracy:true,timeout:15000,maximumAge:0}));
}
export async function capturePhoto(){
 const photo=await Camera.getPhoto({quality:85,resultType:CameraResultType.Uri,source:CameraSource.Camera,width:1600,height:1600,correctOrientation:true,saveToGallery:false});
 if(!photo.webPath)throw Error('No se obtuvo la imagen.');const blob=await (await fetch(photo.webPath)).blob();
 // Redraw strips GPS/EXIF and standardizes JPEG before upload.
 const img=new Image();const url=URL.createObjectURL(blob);try{img.src=url;await img.decode();const canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;canvas.getContext('2d')!.drawImage(img,0,0);return await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('Foto inválida')),'image/jpeg',.85))}finally{URL.revokeObjectURL(url)}
}
export function setupNativeActions(){
 let disposed=false,cleanup:(()=>void)[]=[];
 const dispatch=(url:string)=>{try{const u=new URL(url);if(u.protocol==='soscontigo:'&&u.hostname==='action'&&['sos','prevention','camera'].includes(u.pathname.slice(1))){const action=u.pathname.slice(1);sessionStorage.setItem('sos:pending-action',action);window.dispatchEvent(new CustomEvent('sos:action',{detail:action}))}}catch{}};
 if(Capacitor.isNativePlatform()){
  App.getLaunchUrl().then(v=>{if(!disposed&&v?.url)dispatch(v.url)});
  App.addListener('appUrlOpen',e=>dispatch(e.url)).then(h=>{if(disposed)h.remove();else cleanup.push(()=>{h.remove()})});
 }
 const link=(e:MouseEvent)=>{const a=(e.target as Element)?.closest?.('a');if(a?.href&&/^https:\/\//.test(a.href)&&Capacitor.isNativePlatform()){e.preventDefault();Browser.open({url:a.href})}};
 document.addEventListener('click',link);return()=>{disposed=true;cleanup.forEach(f=>f());document.removeEventListener('click',link)};
}
export async function cancelReminders(){if(!Capacitor.isNativePlatform())return;const p=await LocalNotifications.getPending();if(p.notifications.length)await LocalNotifications.cancel({notifications:p.notifications.map(n=>({id:n.id}))})}
export async function scheduleReminders(care:any,circle:any){
 if(!Capacitor.isNativePlatform())throw Error('Los recordatorios locales se activan desde Android.');
 const permission=await LocalNotifications.requestPermissions();if(permission.display!=='granted')throw Error('Permiso de notificaciones denegado.');
 await ensureNotificationChannels();await cancelReminders();const now=Date.now(),notifications:any[]=[];let id=100;
 const s=care.settings;
 if(s?.water_enabled){for(let day=0;day<7;day++){const date=new Date();date.setDate(date.getDate()+day);date.setSeconds(0,0);for(let m=s.water_start;m<s.water_end;m+=s.water_interval){date.setHours(Math.floor(m/60),m%60,0,0);if(+date>now)notifications.push({id:id++,title:'SOS Contigo',body:'Una pausa para tomar agua.',schedule:{at:new Date(date)},extra:{kind:'water'}})}}}
 if(s?.daily_enabled&&s.daily_due>now)notifications.push({id:id++,title:'SOS Contigo',body:'Es hora de confirmar cómo estás.',schedule:{at:new Date(s.daily_due)},extra:{kind:'daily'}});
 for(const a of circle.agenda||[])if(!a.done&&a.due>now)notifications.push({id:id++,title:'SOS Contigo',body:'Tenés un recordatorio de tu agenda.',schedule:{at:new Date(a.due)},extra:{kind:'agenda'}});
 const scheduled=notifications.sort((a,b)=>+a.schedule.at-+b.schedule.at).slice(0,120).map(n=>({...n,channelId:soundProfile(n.extra.kind).channelId,sound:soundProfile(n.extra.kind).file}));if(scheduled.length)await LocalNotifications.schedule({notifications:scheduled});return scheduled.length;
}
