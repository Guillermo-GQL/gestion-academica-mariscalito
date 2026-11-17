# Mariscalito

Sistema de Matrícula y Asistencia de la I.E. Mariscal Castilla.

Proyecto nuevo, desde cero. Por ahora solo el frontend del módulo 1 (Administrar sistema), fiel al diseño de Figma.

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
