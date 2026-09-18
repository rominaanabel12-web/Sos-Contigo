# Actualizar SOS Contigo a 3.0.0

Esta versión integra el documento «Seguridad, familia, alertas y organización cotidiana». Conserva el proyecto de Google AI Studio, Google Play y los datos anteriores.

## 1. Guardar una copia

Descargá una copia de tu repositorio y guardá los cambios propios que hayas hecho en AI Studio. No reemplaces tus variables privadas, tu configuración de Firebase ni tu firma. Si modificaste un archivo que viene en la actualización, compará los cambios antes de reemplazarlo.

## 2. Subir desde la página de GitHub

1. Descargá y extraé `SOS-Contigo-Actualizacion-3.0.0.zip`.
2. Abrí tu repositorio `rominaanabel12-web/Sos-Contigo`.
3. Elegí **Add file → Upload files**.
4. Abrí la carpeta de archivos indicada en `EMPEZA-AQUI.txt`, dentro del ZIP extraído. Arrastrá **lo que está adentro**, manteniendo las subcarpetas.
5. Confirmá con **Commit changes**. Si hay varias tandas, repetí siempre desde la raíz del repositorio.

Deben aparecer `package.json`, `src`, `server`, `shared`, `scripts` y `android` en la raíz. No debe aparecer una carpeta contenedora «ARCHIVOS-PARA-SUBIR» ni «01_TANDA» dentro del proyecto.

## 3. Abrir la versión nueva en AI Studio

Sincronizá o importá el repositorio actualizado en tu proyecto de AI Studio. Si el código de la vista previa no cambió, todavía está usando una copia anterior: comprobá que `package.json` diga **3.0.0** y exista `src/platform/hub.tsx`.

Usá el texto de `PROMPT-PARA-AI-STUDIO.md`. Ejecutá `npm ci` y `npm run dev`. Entrá a **Explorar la demostración**. El inicio debe tener las tres tarjetas **SOS / Contigo / Mis Alertas**.

El ZIP de actualización no contiene secretos ni reemplaza un servidor ya publicado. La vista previa sirve para revisar la demo, no para avisar realmente a la familia.

## 4. Actualizar la API y su base de datos

Con tus cuentas ya configuradas, realizá una copia de seguridad D1 y aplicá las migraciones desde el proyecto:

```bash
npm ci
npm run db:remote
npm run api:types
npm run api:check
npm run api:deploy
```

La migración nueva es `server/drizzle/0009_platform.sql`. Agrega las tablas de alertas, contactos vinculados, incidentes, sesiones, videos, perfiles y organizaciones. No elimina tablas anteriores. **Aplicá la migración antes de publicar el Worker nuevo.** Conservá el bucket privado y el cron de un minuto. No edites ni vuelvas a aplicar manualmente migraciones ya ejecutadas.

Verificá Firebase, CORS, `VITE_API_BASE_URL`, FCM y secretos del servidor siguiendo los manuales existentes. Los cambios del frontend y del Worker deben desplegarse juntos para usar los módulos nuevos.

## 5. Actualizar productos de Google Play

Configurá los productos nuevos de `docs/03-COBROS-Y-CREDENCIALES.md`. Individual y Familiar tienen precios de referencia nuevos. Los productos anteriores quedan para restauración de compras existentes. No borres sus compras ni sustituyas sus identificadores.

La prueba comienza automáticamente en la primera solicitud autenticada con correo verificado y no genera un cobro. Los códigos familiares siguen el vencimiento real del plan; la renovación conserva la vinculación. Los códigos de contacto individual y de institución son de un solo uso y tienen su propio límite temporal.

## 6. Preparar Android

```bash
npm run android:sync
npm run android:open
```

`android:sync` reconstruye y copia la web nueva; es necesario aunque el repositorio ya tuviera `android/`. Esta versión usa `versionCode 6` y `versionName 3.0.0`; si tu Play Console ya tiene un código mayor, aumentalo antes de compilar.

Para compilar en GitHub consultá `docs/08-COMPILAR-DESDE-GITHUB.md`. Para publicar se necesita AAB firmado, configuración y pruebas de tu cuenta. Esta entrega no incluye APK/AAB generado ni se subió a Play Store.

## 7. Prueba antes de clientes reales

Probá registro/verificación, compra de prueba/restauración/cancelación, invitación entre dos cuentas, notificación a dos teléfonos, modo silencioso, cancelación SOS, temporizador sin respuesta, permisos retirados, privacidad de audios/fotos/videos, bloqueo y restauración de la bóveda, y roles institucionales. Hacelo con personas informadas y sin llamar a números de emergencia para probar.

Precios finales, integrantes familiares, costos de almacenamiento, condiciones institucionales, política de datos, menores y borrado de cuentas deben quedar definidos antes del lanzamiento comercial. El número de emergencia se selecciona por destino; no todos los países usan 911.
