import { navigation } from '../../app/rutas'
import { navigationIcons, pageIcons } from './iconos'
import type { NavigationIconName } from './iconos'
import './sidebar.css'

const groups: Partial<Record<(typeof navigation)[number]['label'], NavigationIconName>> = {
  'Configuración general': 'settings',
  'Gestión de accesos': 'access',
  Seguridad: 'security', Parámetros: 'parametros',
}

function Icon({ name }: { name: NavigationIconName }) {
  return <span className={'menu-icon menu-icon-' + name} aria-hidden="true">
    <img src={navigationIcons[name]} alt="" draggable={false} />
  </span>
}

export function Sidebar({ route, expanded, mobileOpen, toggle, close }: {
  route: string; expanded: boolean; mobileOpen: boolean; toggle: () => void; close: () => void
}) {
  const label = expanded ? 'Contraer menú' : 'Expandir menú'
  const renderGroup = (group: (typeof navigation)[number]) => {
    const icon = groups[group.label]
    return <div className={'nav-group' + (icon ? ' m1-submenu' : '')
      + (group.label === 'Parámetros' ? ' m1-parameters' : '')
      + (group.label === 'Cuenta' ? ' m1-nav-footer' : '')} key={group.label} role="group" aria-label={group.label}>
      {icon && <div className="m1-group-label" title={group.label}>
        <Icon name={icon} /><strong>{group.label}</strong><Icon name="chevron" />
      </div>}
      {group.pages.map(item => {
        const title = 'menuTitle' in item ? item.menuTitle : item.title
        return <a key={item.id} href={'#' + item.id} title={title}
          aria-label={title} aria-current={route === item.id ? 'page' : undefined} onClick={close}>
          <Icon name={pageIcons[item.id]} /><span className="nav-label">{title}</span>
        </a>
      })}
    </div>
  }
  return <aside id="navegacion" className={'sidebar m1-sidebar' + (mobileOpen ? ' abierto' : '')}>
    <div className="brand"><img src="/escudo.png" alt="" width="48" height="48" /><strong>I.E. Mariscal Castilla</strong></div>
    <button className="desktop-toggle m1-sidebar-toggle" type="button" title={label} aria-label={label}
      aria-expanded={expanded} aria-controls="enlaces" onClick={toggle}><Icon name={expanded ? 'toggle' : 'expand'} /></button>
    <nav id="enlaces" aria-label="Administración del sistema">
      <div className="m1-nav-scroll">{navigation.filter(group => group.label !== 'Cuenta').map(renderGroup)}</div>
      {navigation.filter(group => group.label === 'Cuenta').map(renderGroup)}
    </nav>
  </aside>
}
