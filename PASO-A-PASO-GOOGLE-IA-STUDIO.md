# Paso a paso · SOS Contigo en Google AI Studio y Play Store

Este ZIP contiene los archivos de código, la carpeta Android, los sonidos y las instrucciones. Conservá una copia antes de editar. No tenés que volver a pedir que la IA invente toda la aplicación.

## 1. Descargar y extraer

Descargá `SOS-Contigo-Movil.zip` y elegí Extraer en tu administrador de archivos. Adentro está la carpeta `SOS-Contigo-Movil`. Abrila: tenés que ver `package.json`, `src`, `server`, `shared` y `android`.

## 2. Llevar los archivos a un repositorio privado

Creá un repositorio privado en GitHub, por ejemplo `sos-contigo`. Subí **el contenido** de la carpeta, de manera que `package.json` quede en la raíz del repositorio. No subas el ZIP como único archivo: AI Studio necesita los archivos extraídos.

Desde computadora, GitHub Desktop facilita agregar toda la carpeta y publicar el repositorio privado. Desde tableta podés usar la web de GitHub para subir archivos; para conservar todo el proyecto y las carpetas de flujos de compilación conviene hacerlo con una computadora o un entorno de desarrollo conectado al repositorio. No cargues contraseñas, claves de servicio, `.env`, `google-services.json` ni el archivo de firma. `.gitignore` ya los excluye cuando se usa Git.

## 3. Abrir el código en AI Studio

1. Entrá en [Google AI Studio](https://aistudio.google.com/apps).
2. En Build, pulsá **+ / Add files → Import from GitHub**.
3. Conectá tu GitHub y elegí el repositorio privado.
4. Continuá con el proyecto **web React existente**. Esta entrega usa Capacitor para convertir su interfaz en Android; no es un proyecto Kotlin/Compose.
5. Copiá el contenido de `PROMPT-PARA-AI-STUDIO.md` al chat del proyecto.
6. Abrí la vista previa y elegí la demostración para revisar el diseño y escuchar los sonidos.

AI Studio también ofrece proyectos Android nativos Kotlin/Compose. Elegir esa opción para regenerar esta entrega supondría una migración de arquitectura, no una importación equivalente. [Documentación de AI Studio](https://ai.google.dev/gemini-api/docs/aistudio-build-mode).

## 4. Revisar el diseño y los sonidos

Entrá en la demostración. Podés explorar Inicio, Mi círculo, Actividad, Ayuda, Planes, Consultas y Ajustes. Al final de la pantalla, abrí **Escuchar los sonidos de SOS Contigo**. Cada botón Escuchar reproduce un WAV real.

Con una cuenta real: **Ajustes → Avisos y funciones del teléfono → Sonidos**. En Android aparece también Probar aviso y Ajustes Android. Probar aviso solo crea una notificación de prueba en ese teléfono; no avisa a tu círculo.

## 5. Conectar tus cuentas y datos

Seguí `docs/01-INSTALACION.md`: proyecto Firebase, acceso de clientes, registro Android, API Cloudflare, base D1 y archivos R2 privados. Completá `.env` con la configuración pública y URL de API. Las claves privadas se guardan como secretos del servidor.

Esta parte es necesaria para que dos personas compartan información. Una vista previa visual no crea por sí sola tu servicio operativo. Para editar en AI Studio, agregá su origen de vista previa exacto a los permitidos por tu API; evitá abrir CORS a todos los sitios.

## 6. Preparar la primera versión Android

En una computadora con Node 24, Android Studio, JDK 21 y SDK API 36, desde la carpeta del proyecto:

```bash
npm ci
npm run android:sync
npm run android:open
```

Android Studio abrirá `android/`. Completá la sincronización de Gradle. Desde Build → Generate Signed App Bundle / APK, elegí **Android App Bundle** y creá tu clave de firma privada. Respaldala junto con sus contraseñas. Conservá el identificador `com.soscontigo.app` o elegí el definitivo antes de la primera publicación.

El AAB es el archivo para cargar en Play Console. Una APK sirve para instalación de prueba. No están compilados en este ZIP.

Si trabajás desde tableta, se incluye `.github/workflows/android-release.yml`: después de configurar los secretos de firma, entrá a tu repositorio → Actions → Compilar AAB firmado → Run workflow. Descargá el artefacto de una ejecución que termine correctamente. Esto compila en GitHub; no publica automáticamente. La configuración inicial de la clave de firma y los servicios sigue siendo necesaria.

## 7. Crear la app y los cobros en Play Console

Abrí [Google Play Console](https://play.google.com/console), creá tu aplicación y completá los pasos de cuenta que te indique. Configurá tu perfil de pagos. Subí el primer AAB a una pista interna para habilitar la configuración de productos si la consola todavía la requiere.

En `docs/03-COBROS-Y-CREDENCIALES.md` están los tres IDs exactos, los precios, la verificación de compras y los avisos de renovación. La persona paga dentro del cuadro oficial de Google Play. La app no pide un número de tarjeta.

Tu Payoneer no queda conectada automáticamente. Para recibir dinero, la cuenta indicada en el perfil de pagos debe ser admitida por Google para el país y titular de tu comercio. Comprobalo allí antes de anunciar esa forma de retiro.

## 8. Probar y preparar la ficha

Usá la pista interna de Play y cuentas de probadores de licencia. Probá con dos teléfonos: registro, invitación, SOS, prevención, llegada, agua, agenda, sonidos, permisos de fotos/audios, compra pendiente, compra aprobada, restauración y baja. Verificá renovación, reembolso y cambios de estado en el servidor.

Completá la ficha, capturas, correo empresarial, política de privacidad, formulario Seguridad de los datos, acceso para revisión y enlace web de eliminación. El enlace previsto es `https://TU-WEB/?eliminar-cuenta=1`, después de alojar tu web y conectar Firebase/API. Esa URL de ejemplo no existe todavía. La empresa debe atender las solicitudes y eliminar los datos según una política publicada; el código registra la solicitud, no realiza ese borrado completo automáticamente.

## 9. Publicar y promocionar

Cuando las pruebas y los requisitos de tu cuenta estén cumplidos, solicitá la revisión en Play Console. Después de la publicación, compartí la URL real de la ficha que te entregue Google. El enlace de AI Studio y el ZIP de código sirven para desarrollo, no son la ficha pública de Play Store.

El nombre visible de esta aplicación es SOS Contigo. No requiere una cuenta de ChatGPT de tus clientes. Un dominio propio ayuda a la marca, pero podés comenzar con las direcciones HTTPS de tu alojamiento.
