# Mariscalito

Sistema de Matrícula y Asistencia de la I.E. Mariscal Castilla.

Base compartida del frontend del módulo 1 (Administrar sistema). Las vistas de las secciones están vacías para que cada integrante incorpore su maquetación. Funciona con datos de demostración y sin backend.

## Ejecutar y compilar

Requiere Node.js `^20.19.0 || >=22.12.0`, según `frontend/package.json`.

Desde la raíz, en PowerShell:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Abrir la dirección indicada por Vite. Para comprobar TypeScript y generar la compilación:

```powershell
npm.cmd run build
```

En otras terminales se puede usar `npm` en lugar de `npm.cmd`. La instalación reproducible usa el `package-lock.json` incluido. No subir `node_modules`, `dist` ni archivos `.env`.

## Qué incluye la base de Mariano

- React, TypeScript, Vite y Tailwind CSS configurados, con la fuente Inter local.
- Menú lateral compartido con Configuración general, Gestión de accesos, Seguridad y Parámetros; estados expandido, contraído y panel móvil.
- Cabecera con ruta de navegación, acceso al perfil y panel flotante de notificaciones.
- Botones, confirmaciones reutilizables, modal «Hay cambios sin guardar», menús desplegables y avisos globales. Un aviso nuevo sustituye al anterior.
- 13 rutas principales y 20 rutas secundarias reservadas. El acceso y la recuperación de contraseña se muestran sin el menú de administración. Las vistas secundarias mantienen marcada su sección principal.

El inicio de sesión, los formularios de negocio, las tablas y sus estados los desarrolla el responsable de cada sección. Las rutas de esta base muestran «Sección en preparación» hasta integrar esas vistas.

## Integrar una sección

El código de cada funcionalidad va en `frontend/src/modulos/modulo-01/<sección>/`. La estructura anterior `modulo-01-administrar-sistema` solo contiene marcadores vacíos y no se utiliza.

| Ruta principal | Carpeta de sección |
| --- | --- |
| `#panel` | `panel-principal` |
| `#identidad` | `identidad-sistema` |
| `#modulos` | `catalogo-modulos` |
| `#menus` | `menus` |
| `#usuarios` | `usuarios` |
| `#roles` | `roles-y-permisos` |
| `#cuentas` | `cuentas` |
| `#asignacion` | `asignacion-menus` |
| `#recuperacion` | `recuperacion-cuentas` |
| `#vigencia` | `estados-vigencia` |
| `#periodos` | `parametros` |
| `#perfil`, `#acceso` | `acceso` |

1. Crear e importar la vista desde su carpeta.
2. Registrarla en `views`, dentro de `frontend/src/app/rutas/index.ts`. Por ejemplo: `roles: RolesPermisos` o `'perfil/editar': EditarPerfil`.
3. Importar los componentes comunes desde `frontend/src/compartido/componentes`. No copiar el menú lateral ni la cabecera a cada vista.
4. Comprobar escritorio, móvil, estados de la pantalla y compilación antes del pull request.

Las vistas registradas de acceso y recuperación de contraseña controlan su propia estructura de página, sin el layout ni el relleno del contenido administrativo. El proveedor global de avisos se mantiene disponible.

Las rutas secundarias están en `secondaryPages` en ese mismo archivo:

| Sección | Rutas secundarias, precedidas de `#` |
| --- | --- |
| Acceso | `acceso/perfiles`, `acceso/cambiar-rol`, `acceso/primer-ingreso`, `acceso/recuperar`, `acceso/restablecer` |
| Perfil | `perfil/editar`, `perfil/contrasena` |
| Módulos | `modulos/nuevo`, `modulos/editar`, `modulos/detalle` |
| Menús | `menus/nuevo`, `menus/editar` |
| Roles | `roles/nuevo`, `roles/editar`, `roles/permisos` |
| Usuarios | `usuarios/nuevo`, `usuarios/editar`, `usuarios/detalle` |
| Cuentas | `cuentas/nueva`, `cuentas/detalle` |

Son puntos de integración frontend. Las confirmaciones, importaciones, exportaciones, historiales y vistas previas que Figma presenta como modales o paneles se montan desde su sección; no necesitan una ruta adicional. Si un formulario se abre como modal en el diseño, su responsable puede montarlo sobre la pantalla principal y conservar el punto de integración reservado.

## Componentes comunes

| Componente | Uso |
| --- | --- |
| `Button` | Props de un botón HTML, incluida `ref`; `variant` admite `primary`, `secondary` y `danger`. |
| `ConfirmDialog` | `title`, `children`, `onClose`, `onConfirm`; opcionalmente `confirmLabel`, `cancelLabel` y `danger`. Montar solo mientras esté abierto. Escape cancela. |
| `UnsavedDialog` | `onStay` y `onDiscard`. Cada formulario decide cuándo tiene cambios pendientes y cuándo mostrarlo. |
| `useNotify` | Enviar `{ type: 'success' | 'warning' | 'error', message }`. Hay un aviso a la vez y se cierra a los cinco segundos o al pulsar cerrar. El proveedor ya está en `App`. |
| `Dropdown` | `label` y `options`, con `label` y `onSelect` por opción. Cierra al elegir una opción, pulsar Escape o hacer clic fuera. |
| `Panel` | `title`, `children` y `onClose` opcional. Su sección define la posición flotante y el disparador; la cabecera incluye un ejemplo real. |

Lo compartido lo mantiene Mariano. Los integrantes solicitan los cambios comunes que necesiten. `frontend/src/servicios` queda reservado para una etapa posterior.

## Referencias y pendientes de diseño

- [Menú expandido en Figma](https://www.figma.com/design/QoQhAcELypbNqV0jRPckVO?node-id=865-811).
- [Menú contraído en Figma](https://www.figma.com/design/QoQhAcELypbNqV0jRPckVO?node-id=865-1500).
- [Correspondencia de SVG y nodos](frontend/src/compartido/navegacion/README.md).

La variante contraída de referencia no incluye Recuperación de cuentas. Se conserva un ícono provisional para mantener accesible esa opción. Periodos académicos sigue reservado hasta confirmar si corresponde al módulo 1 o al módulo 2. La fidelidad visual en navegador sigue pendiente de comprobación; una compilación correcta no sustituye esa revisión.

## Ramas

| Rama | Uso |
| --- | --- |
| `main` | Producción. Solo recibe lo que QA aprobó. |
| `dev` | Integración. Aquí se unen las ramas de funcionalidad. |
| `qa` | Pruebas. Revisa todo el equipo antes de pasar a producción. |

## Flujo

```text
feature/... -> dev -> qa -> main
```

Cada integrante crea su rama de funcionalidad desde `dev` con el nombre `feature/m1-<sección>`, por ejemplo `feature/m1-modulos`, y la une a `dev` con un pull request.

La base se entrega desde `feature/m1-base-layout`. Los demás empiezan a programar cuando esa base esté integrada en `dev`. Mariano revisa e integra los pull requests y prepara el paso a `qa`; la aprobación de QA y el paso a `main` siguen el acuerdo del equipo.

## Preparar la entrega a GitHub

Desde la raíz, una vez revisados los cambios y estando en `feature/m1-base-layout`:

```powershell
git status --short
git add .gitignore README.md frontend
git diff --cached --stat
git diff --cached --check
git commit -m "feat(m1): completar base compartida y corregir navegacion"
git push -u origin feature/m1-base-layout
```

Abrir el pull request con destino `dev`. La copia local `Mariano-M1-Base-Frontend` y la guía local de la entrega anterior están excluidas de Git; la aplicación que se integra es `frontend`. Este procedimiento no sustituye la revisión y aprobación del equipo.
