import AccountDeletion from './account-deletion';
import {GooglePlaySync} from './play-billing';
import SoundSettings from './sound-settings';
import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {onAuthStateChanged,signOut,type User} from 'firebase/auth';
import {auth} from './lib/firebase';
import AuthScreen from './auth-screen';
import SafetyApp from './app/safety-app';
import MobilePanel,{cleanupDevice} from './mobile-panel';
import {setupNativeActions} from './native';
import './styles.css';
import './mobile.css';
function Root(){
 const [user,setUser]=useState<User|null>(null),[ready,setReady]=useState(!auth),[demo,setDemo]=useState(false);
 useEffect(()=>auth?onAuthStateChanged(auth,u=>{setUser(u);setReady(true)}):undefined,[]);
 useEffect(()=>{const login=()=>setDemo(false);window.addEventListener('sos:login',login);return()=>window.removeEventListener('sos:login',login)},[]);
 useEffect(()=>setupNativeActions(),[]);
 if(!ready)return <div className="auth-shell">Cargando SOS Contigo…</div>;
 if((!demo||new URLSearchParams(location.search).has('eliminar-cuenta'))&&(!user||!user.emailVerified))return <AuthScreen unverified={!!user&&!user.emailVerified} onDemo={()=>setDemo(true)}/>;
 if(new URLSearchParams(location.search).has('eliminar-cuenta'))return <main className="auth-shell"><AccountDeletion/><a href="/">Volver a SOS Contigo</a></main>;
 return <><div className="account-strip"><span>{demo?'Demostración':user?.email}</span><button onClick={async()=>{if(!demo&&auth){await cleanupDevice();await signOut(auth)}setDemo(false)}}>{demo?'Acceder a mi cuenta':'Cerrar sesión'}</button></div><SafetyApp key={demo?'demo':user?.uid} user={!demo&&user?{id:user.uid,name:user.displayName||'Cliente'}:null}/>{!demo?<><GooglePlaySync/><MobilePanel/></>:<details className="mobile-panel" id="mobile-tools"><summary>Escuchar los sonidos de SOS Contigo</summary><SoundSettings/></details>}</>
}
createRoot(document.getElementById('root')!).render(<Root/>);
