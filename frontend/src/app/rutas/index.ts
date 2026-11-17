import type { ComponentType } from 'react'

export const navigation = [
  { label: 'Inicio', pages: [{ id: 'panel', title: 'Panel principal' }] },
  { label: 'Configuración general', pages: [
    { id: 'identidad', title: 'Identidad del sistema' },
    { id: 'modulos', title: 'Catálogo de módulos' },
    { id: 'menus', title: 'Menús y submenús' },
  ] },
  { label: 'Gestión de accesos', pages: [
    { id: 'usuarios', title: 'Gestión de usuarios' },
    { id: 'roles', title: 'Roles y permisos' },
    { id: 'cuentas', title: 'Cuentas de usuario' },
    { id: 'asignacion', title: 'Asignación de menús' },
  ] },
  { label: 'Seguridad', pages: [
    { id: 'recuperacion', title: 'Recuperación de cuentas' },
    { id: 'vigencia', title: 'Estados y vigencia' },
  ] },
  { label: 'Parámetros', pages: [{ id: 'periodos', title: 'Periodos académicos' }] },
  { label: 'Cuenta', pages: [
    { id: 'acceso', title: 'Ingresar al sistema' },
    { id: 'perfil', title: 'Mi perfil' },
  ] },
]

const views: Partial<Record<string, ComponentType>> = {}

export const pages = navigation.flatMap(group =>
  group.pages.map(page => ({ ...page, group: group.label, View: views[page.id] })),
)

export const readRoute = () => location.hash.slice(1) || 'panel'
