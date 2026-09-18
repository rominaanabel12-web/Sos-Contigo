import {Capacitor,registerPlugin} from '@capacitor/core';
import {LocalNotifications} from '@capacitor/local-notifications';
import {SOUND_PROFILES,soundProfile,type SoundKind} from '../shared/notification-sounds';
export {SOUND_PROFILES,soundProfile};
const Settings=registerPlugin<{open(options:{channelId?:string}):Promise<void>}>('NotificationSettings');
let playing:HTMLAudioElement|null=null,micActive=false;
export function stopSound(){if(playing){playing.pause();playing.currentTime=0;playing=null}}
export function microphoneActive(active:boolean){micActive=active;if(active)stopSound()}
export function feedbackEnabled(){try{return localStorage.getItem('sos:interaction-sounds')==='on'}catch{return false}}
export function setFeedbackEnabled(on:boolean){try{localStorage.setItem('sos:interaction-sounds',on?'on':'off')}catch{}if(!on)stopSound()}
export async function previewSound(kind:SoundKind){
 if(micActive)throw Error('Detené la grabación antes de probar un sonido.');
 stopSound();playing=new Audio('/sounds/'+soundProfile(kind).file);playing.volume=.55;
 try{await playing.play()}catch{stopSound();throw Error('El navegador no pudo reproducir audio. Tocá nuevamente Escuchar.')}
}
export function feedbackSound(kind:SoundKind){
 // Optional interface feedback, never an extra copy of an Android push sound.
 if(!feedbackEnabled()||micActive||document.visibilityState!=='visible')return;
 previewSound(kind).catch(()=>{});
}
export async function ensureNotificationChannels(){
 if(Capacitor.getPlatform()!=='android')return;
 for(const p of SOUND_PROFILES.filter(p=>p.notification))await LocalNotifications.createChannel({id:p.channelId,name:p.label,description:p.description,sound:p.file,importance:p.importance,visibility:0,vibration:true,lights:false});
 // Channel IDs remain stable: Android owns subsequent user sound/mute choices.
}
export async function testPhoneNotification(kind:SoundKind){
 if(Capacitor.getPlatform()!=='android')throw Error('Para probar una notificación del sistema, instalá la APK en Android. Acá podés escuchar el tono.');
 const p=soundProfile(kind);if(!p.notification)throw Error('Este tono se usa al confirmar una acción en la app.');
 const permission=await LocalNotifications.requestPermissions();if(permission.display!=='granted')throw Error('Autorizá las notificaciones en los ajustes de Android.');
 await ensureNotificationChannels();await LocalNotifications.schedule({notifications:[{id:200000000+SOUND_PROFILES.indexOf(p),title:'Prueba de sonido · SOS Contigo',body:p.label+'. Prueba solo en este teléfono.',channelId:p.channelId,sound:p.file,schedule:{at:new Date(Date.now()+2000)},extra:{kind:p.kind,test:true}}]});
}
export async function openSoundSettings(kind?:SoundKind){
 if(Capacitor.getPlatform()!=='android')throw Error('Los ajustes por aviso están disponibles en Android.');
 await ensureNotificationChannels();await Settings.open({channelId:kind?soundProfile(kind).channelId:undefined});
}
