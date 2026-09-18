Trabajá sobre el repositorio SOS Contigo 3.0.0 existente. Es una app de seguridad, familia y organización cotidiana. Conservá React 19, Vite, Capacitor 8, Android Java, Firebase Authentication/FCM y el backend Cloudflare Worker/D1/R2. Ejecutá npm ci y npm run dev. No reemplaces el proyecto por una maqueta.

Leé README.md, ACTUALIZAR-A-3.0.0.md y docs/09-ALCANCE-3.0.md antes de cambiarlo. La navegación principal es SOS / CONTIGO / MIS ALERTAS, más MI CUENTA y ORGANIZACIONES. Los componentes nuevos están en src/platform, las rutas en server/platform, los cálculos en shared/platform/schedule.ts y la migración en server/drizzle/0009_platform.sql.

Mantené el SOS por doble toque con cinco segundos para cancelar, el modo silencioso en el emisor, destinatarios y permisos por contacto, ubicación temporal que se detiene al finalizar y se pausa al ocultar la app, check-in, acompañamiento y temporizador con escalamiento explícito. No actives seguimiento permanente, grabación oculta, llamadas automáticas a policía ni accesos a información sin consentimiento. Los accesos rápidos Android abren una confirmación visible.

Preservá audio/texto, fotos, videos con permisos y conservación, recordatorios recurrentes, tareas compartidas, perfiles de viaje/vehículo/mascota y bóveda local AES-GCM con frase. El dictado solo prepara un borrador confirmado por el usuario; no afirma comprensión general con IA. Alertas por ubicación son en primer plano. No anuncies funcionamiento con app cerrada que no esté desarrollado y probado.

Cada nueva cuenta verificada recibe una única prueba Premium de siete días sin tarjeta ni renovación automática. Planes actuales: Premium Individual, una persona, USD 3,99/mes de referencia; Familiar, USD 7,99/mes de referencia, seis integrantes provisionales configurables antes del lanzamiento; Institucional 25/100/500/Enterprise a cotizar. El precio de compra viene de ProductDetails de Google Play. Conservá los productos antiguos únicamente para validar/restaurar suscripciones existentes. No integres Hotmart, billetera ni checkout externo.

Los códigos familiares dependen del fin del período confirmado por Google Play o del resto de la prueba. Se conservan al renovar. No reinicies la prueba ni otorgues un mes nuevo por invitar. Los códigos individuales e institucionales son de un solo uso, siete días como máximo y nunca más que la vigencia correspondiente.

La organización tiene un panel separado y roles admin/responder/member. Las licencias pagas solo las provisiona SOS_ADMIN_UID desde la API con autenticación verificada. Pertenecer a una organización no da acceso a ubicación, bóveda o datos personales. No habilites licencias desde una bandera de frontend.

La API requiere despliegue propio. La vista previa Node de AI Studio no ejecuta el Worker Cloudflare. Sin servicios se muestra una demo con datos ficticios. Nunca guardes claves de servicio, contraseñas, claves de firma, tokens de compra ni secretos en src, VITE_*, prompts o Git. Firebase público y VITE_API_BASE_URL se configuran con las guías.

Comprobá npm test, npm run build, npm run api:types y npm run api:check. Para Android ejecutá npm run android:sync antes de compilar y conservá plugins Java/recursos manuales. No afirmes que el APK/AAB está compilado, firmado, publicado, comprado o probado en dispositivos si esos pasos no se completaron.
