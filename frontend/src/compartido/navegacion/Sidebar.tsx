import { navigation } from '../../app/rutas'
import './sidebar.css'

const groups: Record<string, string> = {
  'Configuración general': 'settings',
  'Gestión de accesos': 'access',
  Seguridad: 'security', Parámetros: 'settings',
}
const icons: Record<string, string> = {
  panel: 'panel', identidad: 'settings', modulos: 'briefcase', menus: 'panel',
  usuarios: 'people', roles: 'access', cuentas: 'profile', asignacion: 'admin',
  periodos: 'activity', recuperacion: 'password', vigencia: 'activity', acceso: 'logout', perfil: 'profile',
}

function Icon({ name }: { name: string }) {
  return <span className={'menu-icon menu-icon-' + name} aria-hidden="true" />
}

export function Sidebar({ route, expanded, mobileOpen, toggle, close }: {
  route: string; expanded: boolean; mobileOpen: boolean; toggle: () => void; close: () => void
}) {
  const label = expanded ? 'Contraer menú' : 'Expandir menú'
  return <aside id="navegacion" className={'sidebar m1-sidebar' + (mobileOpen ? ' abierto' : '')}>
    <div className="brand"><img src="/escudo.png" alt="" width="46" height="46" /><strong>I.E. Mariscal Castilla</strong></div>
    <button className="desktop-toggle m1-sidebar-toggle" type="button" title={label} aria-label={label}
      aria-expanded={expanded} aria-controls="enlaces" onClick={toggle}><Icon name="toggle" /></button>
    <nav id="enlaces" aria-label="Administración del sistema">
      {navigation.map(group => {
        const icon = groups[group.label]
        return <div className={'nav-group' + (icon ? ' m1-submenu' : '')} key={group.label}>
          {icon && <div className="m1-group-label"><Icon name={icon} /><strong>{group.label}</strong><Icon name="chevron" /></div>}
          {group.pages.map(item => <a key={item.id} href={'#' + item.id} title={item.title}
            aria-label={item.title} aria-current={route === item.id ? 'page' : undefined} onClick={close}>
            <Icon name={icons[item.id]} /><span className="nav-label">{item.title}</span>
          </a>)}
        </div>
      })}
    </nav>
  </aside>
}
