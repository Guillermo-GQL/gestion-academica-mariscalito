# Sistema de Gestión Académica — Mariscal Castilla

Prototipo web para apoyar la gestión académica de la **Institución Educativa Integrada Mariscal Castilla**, ubicada en Daniel Hernández, Tayacaja, Huancavelica, Perú.

> **Estado del proyecto:** etapa inicial. Actualmente se desarrolla la interfaz de usuario; el backend, la base de datos y la autenticación real todavía no están implementados.

## Funcionalidades actuales

El prototipo presenta paneles diferenciados para cuatro perfiles:

- **Administrador:** resumen y gestión básica de usuarios de demostración.
- **Personal administrativo:** vista de matrículas y ocupación de vacantes con datos de ejemplo.
- **Docente:** resumen de clases y registro visual de asistencia.
- **Estudiante:** consulta de información académica y horario de clases de demostración.

También incluye selección de perfil, inicio de sesión simulado y navegación entre secciones. Algunas opciones del menú todavía muestran una pantalla de sección en construcción.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React | Construcción de la interfaz |
| TypeScript | Tipado del código |
| Vite | Servidor de desarrollo y compilación |
| Tailwind CSS | Estilos y diseño visual |
| React Router | Navegación entre páginas |
| Lucide React | Iconografía |

## Requisitos

- Node.js 18 o una versión compatible igual o superior a 20.
- npm.

## Instalación y ejecución

La aplicación frontend se encuentra en `mariscal-castilla/`.

```bash
cd mariscal-castilla
npm ci
npm run dev
```

Abre en el navegador la dirección local que Vite muestre en la terminal, normalmente `http://localhost:5173`.

Para comprobar la compilación:

```bash
npm run build
```

Para visualizar localmente la compilación generada:

```bash
npm run preview
```

## Estructura principal

```text
mariscal-castilla/
├── public/              # Recursos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── config/          # Roles y configuración de navegación
│   ├── context/         # Gestión de la sesión de demostración
│   ├── data/            # Datos de ejemplo
│   ├── layouts/         # Estructura común de los paneles
│   └── pages/           # Acceso y paneles por perfil
├── package.json
└── vite.config.ts
```

## Estado y próximos pasos

El repositorio se encuentra en una fase temprana y está orientado a validar la interfaz y los principales flujos de navegación.

- [x] Interfaz inicial con paneles para cuatro perfiles.
- [x] Navegación y sesión de demostración.
- [ ] Implementar backend y API.
- [ ] Incorporar persistencia en una base de datos.
- [ ] Desarrollar autenticación y autorización reales.
- [ ] Completar las secciones pendientes y añadir pruebas automatizadas.

**Importante:** los datos son de demostración. La sesión se gestiona en el navegador y las acciones del prototipo no representan operaciones persistentes. No debe utilizarse como un sistema en producción.

## Licencia

Actualmente no se ha definido una licencia para este repositorio.
