import type {CapacitorConfig} from '@capacitor/cli';
const config:CapacitorConfig={appId:'com.soscontigo.app',appName:'SOS Contigo',webDir:'dist',server:{androidScheme:'https'},android:{allowMixedContent:false},plugins:{PushNotifications:{presentationOptions:['badge','sound','alert']},LocalNotifications:{smallIcon:'ic_stat_sos',iconColor:'#6c3bee'}}};
export default config;
