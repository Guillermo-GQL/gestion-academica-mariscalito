# Navegación compartida del módulo 1

Referencias de Figma:

- [Menú expandido](https://www.figma.com/design/QoQhAcELypbNqV0jRPckVO?node-id=865-811).
- [Menú contraído](https://www.figma.com/design/QoQhAcELypbNqV0jRPckVO?node-id=865-1500).

El ancho es de 256 px expandido y 72 px contraído. En escritorio, los submenús expandidos muestran texto, tal como aparecen en Figma; al contraer, muestran su ícono. Los íconos de los cuatro grupos permanecen visibles en ambos estados. Las cabeceras son botones accesibles que permiten desplegar sus opciones; la sección activa se abre al navegar. Contraer la barra conserva todas las opciones como íconos.

En móvil (hasta 600 px), el panel sigue la referencia de 320 px, con botón de cierre, tarjetas de navegación y acceso al perfil al pie. Los símbolos de las primeras seis tarjetas proceden de la variante móvil `2049:450`; las opciones adicionales conservan sus SVG para que todas las rutas sigan accesibles. En tablet se mantiene la barra de íconos. La navegación principal tiene desplazamiento propio y la zona inferior permanece al pie.

`iconos.ts` centraliza los recursos SVG locales. `pageIcons` exige un ícono por cada `PageId`: al añadir una ruta sin su ícono, TypeScript lo detecta durante la compilación. Las imágenes se centran sin modificar las dimensiones, proporciones ni colores de los archivos originales. No se necesitan bibliotecas de íconos ni URLs temporales.

## Correspondencia con Figma

| Elemento | Archivo SVG | Nodo de origen |
| --- | --- | --- |
| Panel principal | panel.svg | 865:1510 |
| Configuración general | settings.svg | 865:1515 |
| Identidad del sistema | identidad.svg | 865:1519 |
| Catálogo de módulos | modulos.svg | 865:1522 |
| Menús y submenús | menus.svg | 865:1527 |
| Gestión de accesos | access.svg | 865:1530 |
| Gestión de usuarios | usuarios.svg | 865:1533 |
| Roles y permisos | roles.svg | 865:1537 |
| Cuentas de usuario | cuentas.svg | 865:1540 |
| Asignación de menús | asignacion.svg | 865:1543 |
| Seguridad | security.svg | 865:1546 |
| Estados y vigencia | vigencia.svg | 865:1549 |
| Parámetros | parametros.svg | 865:1552 |
| Periodos académicos | periodos.svg | 865:1556 |
| Mi perfil | profile.svg | 865:1560 |
| Cerrar sesión | logout.svg | 865:1563 |
| Expandir menú | toggle-expand.svg | 865:1503 |
| Contraer menú | toggle.svg | 865:816 |
| Flecha de grupo | chevron.svg | 865:834 |

El fondo azul es `#102D8A`; los íconos secundarios, `#BBCBE0`; el panel conserva el turquesa original. El elemento activo usa fondo `#17566F` y acento `#0EA5A8`. Los íconos no cambian de color al contraer la barra.

## Diferencia pendiente del diseño

La opción Recuperación de cuentas figura en el menú expandido, pero no en la variante contraída de referencia. Para mantener la ruta accesible, se conserva provisionalmente `password.svg`, que ya existía en la base, con su trazo ajustado a `#BBCBE0`. No se atribuye este recurso a un nodo de la variante contraída. Al incorporar esa opción, los elementos siguientes se desplazan una fila respecto de esa referencia.

Periodos académicos se mantiene como estaba en la base; su pertenencia al módulo 1 o al módulo 2 continúa pendiente de definición. Cerrar sesión conserva el destino frontend `#acceso`; no implementa autenticación.

## Verificación manual

Desde `frontend`, ejecutar `npm.cmd run dev`. Revisar `#panel`, `#roles`, `#usuarios`, `#vigencia` y `#periodos`, alternando el menú expandido y contraído. Comprobar los cuatro grupos, los íconos de cada opción, el aviso nativo con su nombre y el marcado de la ruta activa. En móvil, abrir el menú, seleccionar una opción y comprobar que se cierre. En ventanas de poca altura, revisar que todas las opciones sean alcanzables mediante desplazamiento. Ejecutar `npm.cmd run build` antes de integrar.

La página de desarrollo `/pruebas/componentes.html` permite comprobar los grupos, la cabecera fija y los componentes comunes. Con el panel móvil abierto, Escape o el fondo lo cierran; Tab permanece en el panel y el contenido de fondo queda inactivo.
