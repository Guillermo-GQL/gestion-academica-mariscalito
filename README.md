# Mariscalito

Sistema de gestión académica para la I.E. Mariscal Castilla.

Este repositorio contiene la base frontend del módulo **Administrar sistema**: navegación, layout y componentes compartidos para integrar las pantallas. Actualmente utiliza datos de demostración y no requiere un backend.

## Tecnologías y requisitos

- React, TypeScript, Vite y Tailwind CSS.
- Node.js `^20.19.0 || >=22.12.0` y npm.
- La fuente Inter se incluye localmente.

## Instalación y ejecución

Desde la raíz del repositorio:

```bash
cd frontend
npm ci
npm run dev
```

Abre en el navegador la dirección indicada por Vite. En PowerShell, si la ejecución de `npm` está restringida, utiliza `npm.cmd`.

Ejecuta los comandos desde `frontend`:

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Verifica TypeScript y genera la compilación en `dist/`. |
| `npm run preview` | Sirve localmente una compilación generada. |

## Estructura

| Ruta | Contenido |
| --- | --- |
| `frontend/src/app/` | Aplicación, layout y registro de rutas. |
| `frontend/src/modulos/modulo-01/` | Vistas de las secciones del módulo. |
| `frontend/src/compartido/componentes/` | Componentes reutilizables. |
| `frontend/src/compartido/navegacion/` | Menú lateral, íconos y estilos de navegación. |
| `frontend/src/compartido/estilos/` | Estilos base. |
| `frontend/src/servicios/` | Espacio reservado para futuras integraciones. |
| `frontend/public/` | Recursos estáticos. |

La carpeta `frontend/src/modulos/modulo-01-administrar-sistema/` conserva marcadores de la estructura anterior; las nuevas vistas se agregan en `modulo-01/`.

## Navegación y rutas

La navegación utiliza fragmentos de URL. Las 13 rutas principales son:

| Sección | Rutas |
| --- | --- |
| Inicio | `#panel` |
| Configuración general | `#identidad`, `#modulos`, `#menus` |
| Gestión de accesos | `#usuarios`, `#roles`, `#cuentas`, `#asignacion` |
| Seguridad | `#recuperacion`, `#vigencia` |
| Parámetros | `#periodos` |
| Cuenta | `#perfil`, `#acceso` |

También hay 20 rutas secundarias reservadas:

| Sección | Rutas secundarias |
| --- | --- |
| Acceso | `#acceso/perfiles`, `#acceso/cambiar-rol`, `#acceso/primer-ingreso`, `#acceso/recuperar`, `#acceso/restablecer` |
| Perfil | `#perfil/editar`, `#perfil/contrasena` |
| Módulos | `#modulos/nuevo`, `#modulos/editar`, `#modulos/detalle` |
| Menús | `#menus/nuevo`, `#menus/editar` |
| Roles | `#roles/nuevo`, `#roles/editar`, `#roles/permisos` |
| Usuarios | `#usuarios/nuevo`, `#usuarios/editar`, `#usuarios/detalle` |
| Cuentas | `#cuentas/nueva`, `#cuentas/detalle` |

Las rutas están definidas en `frontend/src/app/rutas/index.ts`. Las vistas aún no integradas muestran el título de la sección y el mensaje «Sección en preparación». Las vistas de acceso, incluida la recuperación de contraseña, se muestran sin el layout administrativo; las rutas secundarias mantienen activa su sección principal.

## Integrar una pantalla

1. Crea la vista en `frontend/src/modulos/modulo-01/<sección>/`.
2. Impórtala y regístrala en `views`, dentro de `frontend/src/app/rutas/index.ts`. Por ejemplo, `roles: RolesPermisos` o `'perfil/editar': EditarPerfil`.
3. Reutiliza el layout y los componentes de `frontend/src/compartido/`; no dupliques el menú lateral ni la cabecera.
4. Comprueba los estados de la pantalla en escritorio y móvil y ejecuta `npm run build`.

Las confirmaciones, avisos y demás estados se gestionan desde cada sección. Los formularios, tablas y funcionalidades de negocio todavía no están implementados.

## Componentes compartidos

Importa desde `frontend/src/compartido/componentes`:

| Componente | Uso |
| --- | --- |
| `Button` | Botón HTML con `variant` `primary`, `secondary` o `danger`. |
| `ConfirmDialog` | Diálogo controlado por la sección mediante `onClose` y `onConfirm`; admite etiquetas personalizadas y estilo destructivo. |
| `UnsavedDialog` | Confirmación para cambios sin guardar; recibe `onStay` y `onDiscard`. |
| `Dropdown` | Menú de opciones con `label` y acciones `onSelect`; se cierra al elegir, pulsar Escape o hacer clic fuera. |
| `Panel` | Panel con `title`, contenido y `onClose` opcional. |
| `useNotify` | Muestra `{ type: 'success' \| 'warning' \| 'error' \| 'info', message, description? }`; un aviso sustituye al anterior. Éxito e información duran 4 s; advertencia, 5 s; error, 6 s. |

El proveedor de avisos ya está montado en `App`. La cabecera incluye el panel de notificaciones como ejemplo.

Los avisos también se cierran al cambiar de pantalla, abrir un diálogo o iniciar otra acción. `UnsavedDialog` conserva las acciones «Sí, salir» y «No, permanecer» del diseño. Los grupos del menú admiten despliegue individual; al navegar se abre el grupo de la sección activa.

## Comprobar la base

Con el servidor de desarrollo iniciado, abrir `/pruebas/componentes.html`. Esta página permite probar las notificaciones, su reemplazo, los diálogos de confirmación y cambios sin guardar, el desplegable y el desplazamiento del layout. También contiene una lista de comprobaciones para escritorio, tablet y móvil.

La página de pruebas no aparece en el menú del sistema ni se incluye como entrada de la compilación de producción. Sus archivos sí se verifican con TypeScript durante `npm run build`.

Referencias de ancho: escritorio a 1440 px, tablet a 768 px y móvil a 390 px. En móvil, comprobar el cierre del panel, el recorrido del foco con Tab y el bloqueo del desplazamiento del fondo.

## Colaboración

```text
feature/... -> dev -> qa -> main
```

Crear las ramas de funcionalidad desde `dev` y dirigir los pull requests a `dev`. Mantener cada funcionalidad en su carpeta y coordinar los cambios de componentes compartidos.

| Rama | Propósito |
| --- | --- |
| `feature/*` | Desarrollo de funcionalidades. |
| `dev` | Integración mediante pull requests. |
| `qa` | Validación del equipo. |
| `main` | Versión aprobada. |

## Diseño de referencia

- [Menú expandido en Figma](https://www.figma.com/design/QoQhAcELypbNqV0jRPckVO?node-id=865-811).
- [Menú contraído en Figma](https://www.figma.com/design/QoQhAcELypbNqV0jRPckVO?node-id=865-1500).
- [Correspondencia y documentación de los íconos](frontend/src/compartido/navegacion/README.md).

La referencia contraída no incluye Recuperación de cuentas; se mantiene un ícono provisional para que la ruta siga accesible. La ubicación de Periodos académicos entre los módulos 1 y 2 sigue pendiente de definición. Cerrar sesión conserva el destino frontend `#acceso`; no implementa autenticación.
