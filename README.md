# SOS Contigo · Google Play · versión 2.0

Código completo del proyecto React/Vite + Capacitor Android, con API privada, Google Play Billing y doce sonidos originales. Esta versión retira las rutas y pantallas de compra de Hotmart.

**Se entrega código desarrollado y verificado localmente. No se entrega una APK/AAB compilada o firmada, ni una aplicación publicada.** Faltan tus cuentas, configuración de servicios, compilación Android, pruebas de dispositivos/compras y preparación comercial.

## Empezá por aquí

1. Abrí `PASO-A-PASO-GOOGLE-IA-STUDIO.md`.
2. Importá el repositorio en Google AI Studio y usá `PROMPT-PARA-AI-STUDIO.md`.
3. Conectá Firebase y la API siguiendo `docs/01-INSTALACION.md`.
4. Configurá Google Play siguiendo `docs/03-COBROS-Y-CREDENCIALES.md`.
5. Probá avisos, sonidos, permisos y compras con `docs/04-PRUEBAS-Y-LIMITES.md`.

## Funciones incluidas

| Área | Código incluido |
|---|---|
| Clientes | Registro, correo verificado, ingreso, recuperación, cierre de sesión y foto de perfil. |
| Diseño | Logo SOS Contigo, interfaz adaptable a teléfono/tableta, color personal y panel de empresa. |
| Círculos | Invitaciones, límites de integrantes, eliminar integrantes y salir del círculo. |
| Seguridad | SOS con confirmación, prevención, Estoy bien, trayectos con hora prevista, avisos por falta de confirmación. |
| Ubicación | Posición puntual con permiso, antigüedad visible y mapa con consentimiento. |
| Registros | Descripciones y audio de hasta dos minutos; privado, compartido ahora o al emitir SOS; permiso a círculo o contacto para notas. Fotos con permiso elegido al guardar. |
| Vida diaria | Agua, agenda, recordatorios aproximados, chequeo diario y pedidos de compañía, llamada o recogida. |
| Avisos | Cola persistente, reintentos, recepción por FCM y apertura diferenciadas; nueve categorías Android con sonido propio. |
| Sonidos | Doce WAV originales: nueve avisos y tres confirmaciones de interfaz opcionales. Escucha y prueba local desde Mi teléfono. |
| Planes | US$ 4.99 / 9.99 / 19.99 de referencia, 2 / 6 / 30 personas, prueba de siete días sin tarjeta; compra, restauración y gestión Google Play. |
| Empresa | Consultas privadas, respuestas de administradora, correo y enlaces sociales editables. |
| Cuenta | Solicitud de eliminación desde app o web; registro idempotente y revisión manual de administradora. El borrado completo requiere gestión operativa. |

No hay billetera que custodie dinero, despacho de policía, localización continua, grabación oculta ni identificación automática de un atacante. Los accesos Android abren una confirmación. Las alertas dependen de conexión, permisos, batería y disponibilidad de los servicios.

## Arquitectura de esta entrega

- Google AI Studio: edición y vista previa del proyecto existente.
- React/Vite: interfaz; Capacitor y código Java: aplicación Android.
- Firebase Authentication: cuentas; Firebase Cloud Messaging: transporte de avisos.
- Cloudflare Worker: API; D1: datos; R2 privado: fotos y audios. No se guardan estos archivos en Google Play.
- Google Play Billing: cobro de suscripciones; el servidor consulta Android Publisher y confirma el comprobante antes de habilitar el plan.

La API actual utiliza servicios Cloudflare; el runtime Node de la vista previa AI Studio no la reemplaza. Para usarla de verdad, desplegá la API y configurá su URL. Este proyecto no usa la API de Gemini para sus funciones.

## Inicio local

```bash
npm ci
npm run dev
```

Sin Firebase configurado aparece el acceso a la demostración. La demostración tiene datos ficticios; no envía SOS ni cobra.

```bash
npm test
npm run api:types
npm run api:check
npm run android:sync
npm run android:open
```

Los detalles y el estado de verificación están en `ENTREGA.json`. No hay secretos, cuenta de cobro, dominio ni firma configurados. No publiques el enlace de este ZIP como si fuera la app para clientes.
