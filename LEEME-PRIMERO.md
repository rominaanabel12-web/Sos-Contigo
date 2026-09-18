# SOS Contigo · versión 3.0.0

Seguridad, familia, alertas y organización cotidiana. Actualización del proyecto React/Vite + Capacitor Android, según el documento funcional de 40 apartados.

**Esta entrega contiene código fuente y una demostración funcional. No es una APK/AAB firmada ni una app publicada.** Los usuarios reales, avisos entre teléfonos, almacenamiento remoto y compras necesitan configurar los servicios propios y probar Android en dispositivos. No se modificó automáticamente tu repositorio de GitHub.

## Actualizar tu proyecto

Si ya tenés SOS Contigo, empezá por `ACTUALIZAR-A-3.0.0.md`. Subí el contenido de las carpetas del ZIP de actualización a la raíz de tu repositorio; no subas el ZIP. Conservá tus variables y secretos privados. La actualización de la interfaz no despliega el servidor.

Para usar Google AI Studio, importá/sincronizá el repositorio y pegá `PROMPT-PARA-AI-STUDIO.md`.

## Lo que incluye

| Área | Funciones desarrolladas |
|---|---|
| Inicio | Accesos SOS / Contigo / Mis Alertas; próximas tareas, familiares, prueba y cuenta. |
| SOS | Doble toque, cinco segundos cancelables, modo silencioso en el emisor, protocolo por contacto, prioridades, permisos, historial y confirmación de lectura. |
| Contigo | Familia, códigos de invitación, contactos de confianza con consentimiento y QR, estados, check-in, acompañamiento y temporizador con escalamiento voluntario. |
| Ubicación | Sesiones temporales, destinatarios elegidos, pausa al ocultar la app y retirada al finalizar. Sin seguimiento permanente. |
| Evidencias | Audio y texto; fotografías; videos privados o ligados a un incidente, descargas, retirada de acceso y conservación definida. |
| Mis Alertas | Recordatorios, vencimientos, turnos, cumpleaños, hábitos y tareas; recurrencias y días elegidos; múltiples avisos; tareas compartidas con «Lo hago yo»; insistencia hasta HECHO. |
| Organización cotidiana | Perfiles de viajes, vehículo y mascotas; creación de recordatorios desde fechas; flujo de accidente; resúmenes del día y pendientes para mañana. |
| Voz y lugar | Dictado si el navegador lo permite, borrador que debe confirmarse; avisos por llegada con ubicación mientras la sección está visible. |
| Bóveda | Documentos cifrados localmente con AES-GCM, frase de acceso, bloqueo automático, copia cifrada y restauración. |
| Mi cuenta | Foto, tema, permisos, sonidos, consulta de suscripción, gestión/cancelación en Google Play, consultas y solicitud de eliminación. |
| Organizaciones | Panel separado; usuarios y roles; licencias activadas por operador; incidentes, responsables, estados, auditoría y reporte CSV. |

Se conserva la agenda de teléfonos, la bitácora, el agua, el soporte y las funciones anteriores. Los datos viejos no se migran ni borran silenciosamente: la agenda familiar anterior permanece en su pantalla; Mis Alertas utiliza registros nuevos.

## Planes actualizados

- Premium Individual: una persona; **USD 3,99/mes de referencia**.
- Familiar: **USD 7,99/mes de referencia**; cupo inicial configurable de seis integrantes, pendiente de definición comercial antes del lanzamiento.
- Institucional: propuesta para 25 / 100 / 500 / Enterprise; precio a cotizar, sin checkout ficticio.
- Cuenta nueva verificada: **siete días de Premium completo** (hasta seis integrantes durante la prueba), sin tarjeta ni cobro automático. No se reinicia al reinstalar, invitar o cancelar.

Los precios finales los definís en Play Console. La compra muestra el precio real y condiciones de Google Play. El catálogo antiguo se conserva únicamente para verificar/restaurar suscriptores anteriores; no se cambia su precio unilateralmente. Payoneer no se configura en el código: la cuenta receptora debe ser aceptada por el perfil de pagos de Google.

## Ejecución y comprobaciones

```bash
npm ci
npm run dev
npm test
npm run build
npm run api:types
npm run api:check
npm run android:sync
```

La demo funciona sin credenciales, usa datos ficticios y no envía avisos ni cobra. Sus cambios quedan en la sesión, salvo la bóveda de demostración que se almacena cifrada en el dispositivo.

`ENTREGA.json` registra las verificaciones realizadas y pendientes. La correspondencia con cada apartado del documento está en `docs/09-ALCANCE-3.0.md`.

## Servicios y límites reales

Firebase Authentication/FCM, Cloudflare Worker/D1/R2, Google Play Billing y Android Publisher. El proyecto no depende de Hotmart. AI Studio sirve para editar y previsualizar; su servidor Node no reemplaza la API Cloudflare. No usa Gemini para interpretar libremente recordatorios.

Las notificaciones requieren permisos, conectividad y servicios operativos; Android puede retrasarlas. No se garantiza recepción ni respuesta policial. No hay cámara oculta, reconocimiento de atacantes, billetera que custodie dinero, interceptación del botón de encendido, seguimiento en segundo plano ni biometría implementada en esta versión. Los accesos rápidos de Android abren una confirmación visible.

Leé `docs/01-INSTALACION.md`, `docs/03-COBROS-Y-CREDENCIALES.md` y `docs/10-OPERACION-3.0.md` para configurar y operar el servicio.
