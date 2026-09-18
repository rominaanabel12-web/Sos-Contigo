import {useEffect} from 'react';
import {Capacitor,registerPlugin,type PluginListenerHandle} from '@capacitor/core';
import {App} from '@capacitor/app';
import {apiFetch} from './lib/api';
import {PLAY_PRODUCTS} from '../shared/play-products';
import {toast} from 'sonner';
type Purchase={purchaseToken:string,state:number,products:string[]};
export const PlayBilling=registerPlugin<{
 getProducts():Promise<{products:{productId:string,name:string,basePlanId:string,price:string,currency:string,period:string}[]}>;
 purchase(options:{productId:string,accountId:string}):Promise<{launched:boolean}>;
 restore():Promise<{purchases:Purchase[]}>;
 manage(options:{productId?:string}):Promise<void>;
 addListener(name:'purchaseUpdated',listener:(event:{ok:boolean,cancelled:boolean,purchases:Purchase[]})=>void):Promise<PluginListenerHandle>;
}>('PlayBilling');
let verifying=false;
async function verifyPurchases(purchases:Purchase[],announce:boolean){
 if(verifying)return;verifying=true;
 try{for(const p of purchases.filter(p=>p.products.some(id=>PLAY_PRODUCTS.some(x=>x.productId===id))).slice(0,10)){
  if(p.state===2){if(announce)toast.info('Pago pendiente. El plan se activa después de la confirmación de Google Play.');continue}
  if(p.state!==1)continue;
  const r=await apiFetch('/api/billing',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'verify',purchaseToken:p.purchaseToken})}),v=await r.json();
  if(!r.ok){if(announce)toast.error(v.error||'No se pudo verificar. Usá Restaurar compras.');continue}
  if(announce)toast.success(v.subscription?.active?(v.subscription.environment==='test'?'Compra de prueba verificada.':'Tu plan está activo.'):'Estado actualizado. Revisá tu suscripción.');
  window.dispatchEvent(new Event('sos:billing-updated'));
  // Respect server request limits across several old subscriptions returned by Play.
  await new Promise(resolve=>setTimeout(resolve,1600));
 }}finally{verifying=false}
}
export async function restorePurchases(announce=true){if(Capacitor.getPlatform()!=='android')throw Error('Restaurá tus compras desde la app instalada con Google Play.');const r=await PlayBilling.restore();if(!r.purchases.length&&announce)toast.info('Google Play no devolvió suscripciones para esta cuenta.');await verifyPurchases(r.purchases,announce)}
export function GooglePlaySync(){
 useEffect(()=>{if(Capacitor.getPlatform()!=='android')return;let disposed=false;const handles:PluginListenerHandle[]=[];
 const add=(h:PluginListenerHandle)=>{if(disposed)h.remove();else handles.push(h)};
 PlayBilling.addListener('purchaseUpdated',e=>{if(e.cancelled){toast.info('Compra cancelada.');return}if(!e.ok){toast.error('No se completó la compra. Revisá Google Play.');return}verifyPurchases(e.purchases,true).catch(()=>toast.error('La verificación quedó pendiente. Usá Restaurar compras.'))}).then(add).catch(()=>{});
 App.addListener('appStateChange',s=>{if(s.isActive)restorePurchases(false).catch(()=>{})}).then(add);
 restorePurchases(false).catch(()=>{});return()=>{disposed=true;handles.forEach(h=>h.remove())};
 },[]);return null;
}
