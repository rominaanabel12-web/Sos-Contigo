# SOS Contigo 2.1.1 · El código sigue la vigencia del plan

El código de invitación sirve durante el período vigente de la suscripción de quien administra el círculo. Si se confirma la renovación, continúa el mismo código. Los familiares ya unidos no tienen que vincularse cada mes.

- El período mensual termina en la fecha que confirma Google Play. Generar el código después de pagar no agrega un mes nuevo.
- Sin un plan o prueba vigente, no se generan códigos ni se admiten nuevos integrantes.
- La prueba gratuita dura siete días desde su activación. Un código creado durante la prueba dura lo que queda de ella.
- Cancelar la renovación permite usar el tiempo ya pagado. Al terminar, el código queda inactivo para nuevos ingresos.
- El vencimiento no elimina la familia ni sus registros. Al verificar un nuevo período vigente, puede usarse el mismo código si no se reemplazó ni revocó.
- El servidor controla el cupo del plan de quien creó el círculo. Cada familiar tiene su propia cuenta.
- Un código reemplazado o revocado no vuelve a funcionar por renovar el plan.

La app muestra hasta cuándo está habilitada la invitación en **Mi círculo → Invitar a mi círculo**. El botón **Reemplazar código** invalida el anterior; no es el botón de renovar la suscripción.

## Cómo subir esta actualización

`SOS-Contigo-Actualizacion-2.1.1.zip` es acumulativo: incluye los cambios de seguridad, bitácora, contactos y sonidos de 2.1 y esta nueva regla. Sirve para un proyecto 2.0 o 2.1. Guardá primero una copia y sincronizá cualquier cambio propio de AI Studio para poder comparar antes de reemplazar archivos.

1. Extraé el ZIP en Windows.
2. Abrí tu repositorio `rominaanabel12-web/Sos-Contigo` en GitHub.
3. Elegí **Add file → Upload files**.
4. Abrí `ARCHIVOS-PARA-SUBIR` y arrastrá **su contenido** a GitHub, sin subir la carpeta contenedora ni el ZIP. `package.json` debe quedar en la raíz del repositorio.
5. Pulsá **Commit changes**. En AI Studio, desde **Settings → GitHub**, traé los cambios del repositorio y volvé a abrir la vista previa.

La demostración no verifica pagos ni conecta familiares reales. Para el servicio real hay que actualizar el servidor además de la interfaz: con la configuración de tu API existente, ejecutar `npm run api:deploy`. Esta regla no agrega una migración respecto de 2.1. Si venís de 2.0, también necesitás aplicar `0008_private_contacts.sql` siguiendo la guía de 2.1. La entrega no se desplegó en tu cuenta.

Antes de generar Android, ejecutá `npm run android:sync` y compilá/firmá tu APK o AAB. Esta entrega contiene código, no una APK publicada.

## Comprobación

Pasaron 587 aserciones locales, incluyendo 54 nuevas que comprueban el código al renovar, al vencer, con suspensión de pago, con cancelación, durante la prueba, con el círculo completo y después de revocarlo. Las respuestas de Google son sustitutos de prueba; no se hicieron cobros reales.

Google Play puede conservar temporalmente el acceso durante reintentos de pago o períodos de gracia. La app usa el estado y la fecha que confirma Play. La configuración comercial y ese límite están explicados en `docs/03-COBROS-Y-CREDENCIALES.md` y en la [documentación oficial](https://developer.android.com/google/play/billing/lifecycle/subscriptions).
