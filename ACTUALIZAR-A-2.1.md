# SOS Contigo 2.1 · Actualizar tu demostración

Esta actualización incorpora el SOS visible y la bitácora, una agenda privada de ayuda y nuevos sonidos. Es código para tu proyecto. No modifica automáticamente tu repositorio ni tu aplicación abierta en Google AI Studio.

## Si ya subiste la versión 2.0 a GitHub

1. Descargá `SOS-Contigo-Actualizacion-2.1.zip` y elegí **Extraer todo** en Windows.
2. Antes de reemplazar archivos, guardá los cambios que hayas hecho en AI Studio. Conservá una copia: en GitHub, **Code → Download ZIP**. Si AI Studio modificó el código, sincronizá primero esos cambios y revisá las diferencias de los archivos de esta actualización; no descartes diseños propios sin revisarlos.
3. Abrí la página principal de [tu repositorio Sos-Contigo](https://github.com/rominaanabel12-web/Sos-Contigo).
4. Elegí **Add file → Upload files**.
5. Abrí `ARCHIVOS-PARA-SUBIR` dentro de la actualización. Arrastrá **todo lo que está dentro**, incluyendo sus carpetas, a GitHub. No arrastres el ZIP ni la carpeta contenedora `ARCHIVOS-PARA-SUBIR`. `package.json` debe quedar directamente en la página principal del repositorio.
6. Escribí como descripción `SOS visible, bitácora, contactos y sonidos 2.1` y pulsá **Commit changes**. Esto reemplaza archivos del mismo nombre y agrega los nuevos.
7. En el proyecto ya abierto de Google AI Studio, buscá **Settings → GitHub** y traé los cambios del repositorio (**pull**). La conexión GitHub de AI Studio permite recuperar cambios externos; los rótulos pueden variar. Si tu pantalla no ofrece la sincronización, importá el repositorio actualizado como un proyecto web React y conservá el proyecto anterior como copia.
8. Cuando termine de reconstruirse la vista previa, pulsá **Explorar la demostración**. Arriba debe aparecer un gran botón rojo SOS y accesos a Grabar lo que veo, Mis contactos, Planes y pagos, Privacidad, Sonidos y Foto del entorno.

Si aparecen conflictos, compará los archivos antes de aceptar un reemplazo completo. El paquete completo actualizado `SOS-Contigo-Movil.zip` también está disponible para una instalación nueva.

Esta actualización no incluye la carpeta compilada `android/app/src/main/assets/public`: se regenera con `npm run android:sync`. No compiles una APK reutilizando los recursos de la versión anterior sin ejecutar ese paso.

## Cómo comprobar lo que pediste

| Acción | Resultado en la demostración |
|---|---|
| Tocá el SOS una vez | Se pide un segundo toque. No se registra un aviso. |
| Tocá dos veces dentro de 1,2 segundos | Comienza una cuenta de cinco segundos. Podés cancelar. Después se registra un aviso de ejemplo. |
| Tocá dos veces el logo | Abre la misma cuenta regresiva SOS. También hay una confirmación accesible con un solo toque. |
| Grabar lo que veo | Permite escribir una descripción o grabar voz con permiso de micrófono, hasta dos minutos. Al detener, intenta guardar. Esperá la confirmación. |
| Tu bitácora | Muestra textos y audios guardados; permite escuchar, descargar, eliminar y elegir permisos. |
| Foto del entorno | Permite elegir/tomar una foto y guardarla con una descripción en Fotos guardadas. |
| Mis contactos | Permite agregar hasta 50 teléfonos y preparar un mensaje. En demo, las llamadas y mensajes solo se simulan. |
| Sonidos | Permite escuchar doce tonos nuevos, breves y suaves, y ajustar el volumen de la escucha. |
| Ingresar / Crear cuenta | Muestra los formularios. Para habilitarlos hay que conectar Firebase. |
| Planes y pagos | Muestra los planes y el flujo previsto. La demo no cobra. |

**Los registros de demo se guardan solo en memoria:** permanecen al cambiar de sección y se borran al recargar, cerrar o salir de la demostración. Descargá una copia del audio o del texto si querés conservar la prueba. Una cuenta real, con API configurada, guarda sus registros privados en el servidor. Si el guardado falla, la bitácora conserva el borrador en pantalla y permite reintentar; no presenta un envío fallido como guardado.

Los formularios pueden necesitar permisos de cámara/micrófono en el navegador y en la vista previa de AI Studio. Si la vista incrustada los bloquea, abrí la vista previa en una pestaña admitida por AI Studio o probá en Android. Nunca se captura sonido o imagen a escondidas.

## Qué significa compartir

- **Solo yo:** una nota o foto privada no se comparte por activar SOS.
- **Desde ahora:** se habilita a los destinatarios seleccionados.
- **Al confirmar SOS:** queda preparada hasta que se registra un SOS. Una nota puede dirigirse a un integrante o al círculo; las fotos se comparten con el círculo.
- **Retirar acceso / Dejar privada:** retira el acceso futuro. No borra copias que otra persona ya descargó.
- Agregar un teléfono a la agenda no agrega esa persona al círculo de la app. Para recibir avisos automáticos y registros compartidos necesita una cuenta vinculada, permisos y servicios activos.

En una cuenta real, Llamar abre el marcador. SMS y WhatsApp preparan el texto para una persona de confianza; el envío se confirma en la otra aplicación. La agenda muestra el 911 para Argentina **como llamada**. No supone que la policía reciba SMS o WhatsApp ni avisa automáticamente a servicios públicos. Los teléfonos de otros países deben configurarse con su número local verificado. [Números oficiales de Argentina](https://www.argentina.gob.ar/tema/emergencias).

## Activar cuentas reales, avisos y pagos

Seguí `docs/01-INSTALACION.md` y `docs/03-COBROS-Y-CREDENCIALES.md`. Se necesita configurar Firebase Authentication/FCM, la API Cloudflare, D1 y R2 privados, los orígenes permitidos y Google Play Console. No compartas claves privadas por el chat ni las subas a GitHub.

La nueva agenda usa la migración `server/drizzle/0008_private_contacts.sql`. Con tus servicios ya configurados, desde el proyecto:

```bash
npm ci
npm test
npm run api:types
npm run db:remote
npm run api:deploy
npm run android:sync
npm run android:open
```

`db:remote` y `api:deploy` modifican tu servicio real: revisá previamente el destino en `server/wrangler.jsonc` y respaldá los datos si ya hay clientes. La entrega no los ejecutó contra tu cuenta.

Los planes mantienen US$ 4.99, 9.99 y 19.99 como precios de referencia, con siete días de prueba sin tarjeta. El precio de compra se obtiene de Google Play cuando sus productos están configurados. No se integra Hotmart. Payoneer no es el formulario de cobro de clientes: la cuenta de recepción se gestiona en el perfil de pagos admitido por Google. No hay cobros reales activados en este ZIP.

## Protección de datos y límites de esta entrega

La API verifica la identidad y el correo verificado; los contactos se consultan, modifican y borran únicamente con el usuario autenticado. Fotos y audios usan almacenamiento privado y comprobaciones de permisos; no se publican enlaces permanentes abiertos. Los pagos se verifican en el servidor. La aplicación no recopila números completos de tarjetas.

Se incorporaron pruebas que intentan leer/modificar contactos de otra cuenta y verifican que se rechacen. También siguen pasando las pruebas de acceso a notas, fotos, revocación y propiedad de compras. Esto no constituye una auditoría independiente ni garantiza seguridad absoluta. No se implementó cifrado de extremo a extremo: el servicio procesa datos y la operación de la empresa debe proteger los accesos administrativos. [Seguridad del almacenamiento D1](https://developers.cloudflare.com/d1/reference/data-security/).

La eliminación de cuenta registra una solicitud para la empresa; el borrado integral sigue requiriendo procesamiento operativo, incluyendo `private_contacts`. Antes del lanzamiento faltan configurar tus servicios, compilar y firmar Android, probar con teléfonos y compras de prueba, y completar la política de privacidad y la ficha de Play.

En Android el volumen y silencio de notificaciones los controla el sistema y la persona. El nuevo control de volumen de la app modifica la escucha de tonos y las confirmaciones internas; no fuerza el volumen de las notificaciones del teléfono. Se conservan los identificadores de canales para respetar las elecciones existentes.

No se entregó una APK/AAB firmada ni se publicó nada. Revisá `ENTREGA.json` para ver las comprobaciones realizadas y pendientes.

[Sincronización de GitHub en AI Studio](https://ai.google.dev/gemini-api/docs/aistudio-build-mode) · [Subir archivos a GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).
