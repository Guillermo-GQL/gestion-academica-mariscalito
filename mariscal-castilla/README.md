# Sistema de Matrícula y Asistencia · I.E. Mariscal Castilla (prototipo)

Prototipo visual e interactivo. **Sin base de datos ni backend**: todos los datos son de ejemplo y viven en memoria.

**Stack:** React + TypeScript · Vite · Tailwind CSS · React Router

## Ejecutar
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # versión de producción en /dist
```

## Credenciales de demostración
| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | admin | admin123 |
| Personal administrativo | secretaria | secre123 |
| Docente | docente | docente123 |
| Estudiante | estudiante | estudiante123 |

## Estructura
- `src/config/roles.ts` — roles, menú del sidebar y credenciales demo (aquí se agregan secciones)
- `src/pages/RoleSelect.tsx` y `Login.tsx` — selección de rol e inicio de sesión
- `src/layouts/PanelLayout.tsx` — sidebar + barra superior, protegido por rol
- `src/pages/dashboards/` — panel principal de cada rol
- `src/pages/Placeholder.tsx` — pantallas aún por construir
- `src/data/mock.ts` — datos de ejemplo
- `public/logo.png`, `public/fachada.jpg` — recortados de las capturas; reemplázalos por los originales
