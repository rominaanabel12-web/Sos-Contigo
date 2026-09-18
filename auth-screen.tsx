import {useState} from 'react';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,updateProfile,signOut} from 'firebase/auth';
import {auth} from './lib/firebase';
export default function AuthScreen({unverified=false,onDemo}:{unverified?:boolean,onDemo:()=>void}){
 const [mode,setMode]=useState('login'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[name,setName]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 async function submit(e:React.FormEvent){e.preventDefault();if(!auth)return;setBusy(true);setMessage('');try{
 if(mode==='reset'){await sendPasswordResetEmail(auth,email);setMessage('Si existe una cuenta con ese correo, recibirás instrucciones.');return}
 if(mode==='signup'){const c=await createUserWithEmailAndPassword(auth,email,password);await updateProfile(c.user,{displayName:name.trim()||'Cliente'});await sendEmailVerification(c.user);setMessage('Revisá tu correo para verificar tu cuenta.')}else await signInWithEmailAndPassword(auth,email,password);
 }catch{setMessage('No pudimos completar la solicitud. Revisá los datos, la conexión o intentá recuperar tu contraseña.')}finally{setBusy(false)}}
 return <main className="auth-shell"><section className="auth-card"><img src="/logo-v3.png" width="96" alt="SOS Contigo"/><p className="eyebrow">TU GENTE, MÁS CERCA</p><h1>SOS Contigo</h1><p>Un espacio para acompañarse y pedir ayuda.</p>
 {!auth?<><p className="setup-info">Vista de demostración. Configurá Firebase y la dirección de la API para habilitar cuentas y datos reales.</p><button className="button primary" onClick={onDemo}>Explorar la demostración</button></>:unverified?<><h2>Verificá tu correo</h2><p>Enviamos un enlace a {auth.currentUser?.email}. Después de abrirlo, volvé a ingresar.</p><button className="button primary" onClick={async()=>{await auth.currentUser?.reload();location.reload()}}>Ya verifiqué mi correo</button><button className="button outline" onClick={async()=>{try{if(auth.currentUser)await sendEmailVerification(auth.currentUser);setMessage('Enlace enviado.')}catch{setMessage('Esperá un momento antes de reenviar.')}}}>Reenviar enlace</button><button className="text-link" onClick={()=>signOut(auth)}>Usar otra cuenta</button></>:<form onSubmit={submit}>
 <h2>{mode==='signup'?'Crear mi cuenta':mode==='reset'?'Recuperar contraseña':'Entrar a mi cuenta'}</h2>
 {mode==='signup'&&<label>Nombre<input required maxLength={50} value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></label>}
 <label>Correo electrónico<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label>
 {mode!=='reset'&&<label>Contraseña<input type="password" required minLength={mode==='signup'?12:1} value={password} onChange={e=>setPassword(e.target.value)} autoComplete={mode==='signup'?'new-password':'current-password'}/></label>}
 <button className="button primary" disabled={busy}>{busy?'Procesando…':mode==='signup'?'Crear cuenta':mode==='reset'?'Enviar instrucciones':'Ingresar'}</button>
 <button type="button" className="text-link" onClick={()=>setMode(mode==='signup'?'login':'signup')}>{mode==='signup'?'Ya tengo cuenta':'Crear una cuenta'}</button><button type="button" className="text-link" onClick={()=>setMode(mode==='reset'?'login':'reset')}>{mode==='reset'?'Volver al ingreso':'Olvidé mi contraseña'}</button><button type="button" className="text-link" onClick={onDemo}>Ver demostración</button>
 </form>}{message&&<p role="status">{message}</p>}<small>No reemplaza los servicios de emergencia. Las alertas requieren conexión y permisos del teléfono.</small></section></main>
}
