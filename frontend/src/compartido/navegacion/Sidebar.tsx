import { useEffect, useId, useState } from 'react'
import { navigation } from '../../app/rutas'
import type { PageId } from '../../app/rutas'
import { navigationIcons, pageIcons } from './iconos'
import type { NavigationIconName } from './iconos'
import './sidebar.css'

const groups: Partial<Record<(typeof navigation)[number]['label'], NavigationIconName>> = {
  'Configuración general': 'settings',
  'Gestión de accesos': 'access',
  Seguridad: 'security', Parámetros: 'parametros',
}

// Los primeros elementos del panel móvil usan estos símbolos en Figma.
const mobileGlyphs: Partial<Record<PageId, string>> = {
  panel: '⌂', identidad: '◇', modulos: '▦', menus: '☷', usuarios: '◉', roles: '◆',
}

function Icon({ name }: { name: NavigationIconName }) {
  return <span className={'menu-icon menu-icon-' + name} aria-hidden="true">
    <img src={navigationIcons[name]} alt="" draggable={false} />
  </span>
}

export function Sidebar({ route, routeKey = route, expanded, mobileOpen, toggle, close }: {
  route: string; routeKey?: string; expanded: boolean; mobileOpen: boolean; toggle: () => void; close: () => void
}) {
  const [closedGroups, setClosedGroups] = useState<Record<string, boolean>>({})
  const id = useId()
  const label = expanded ? 'Contraer menú' : 'Expandir menú'
  useEffect(() => {
    const active = navigation.find(group => group.pages.some(page => page.id === route))
    if (active) setClosedGroups(previous => previous[active.label] ? { ...previous, [active.label]: false } : previous)
  }, [route, routeKey])

  const toggleGroup = (group: string) => {
    if (!expanded && !mobileOpen) {
      setClosedGroups(previous => ({ ...previous, [group]: false }))
      toggle()
    } else {
      setClosedGroups(previous => ({ ...previous, [group]: !previous[group] }))
    }
  }

  const renderGroup = (group: (typeof navigation)[number]) => {
    const icon = groups[group.label]
    const isOpen = !closedGroups[group.label] || (!expanded && !mobileOpen)
    const pagesId = id + '-' + (icon ?? group.label)
    return <div className={'nav-group' + (icon ? ' m1-submenu' : '')
      + (group.label === 'Parámetros' ? ' m1-parameters' : '')
      + (group.label === 'Cuenta' ? ' m1-nav-footer' : '')} key={group.label} role="group" aria-label={group.label}>
      {icon && <button type="button" className="m1-group-label" title={group.label}
        aria-label={group.label} aria-expanded={isOpen} aria-controls={pagesId} onClick={() => toggleGroup(group.label)}>
        <Icon name={icon} /><strong>{group.label}</strong><Icon name="chevron" />
      </button>}
      <div id={pagesId} className="m1-group-pages" data-collapsed={!isOpen}>
        {group.pages.map(item => {
          const title = 'menuTitle' in item ? item.menuTitle : item.title
          const glyph = mobileGlyphs[item.id]
          return <a key={item.id} href={'#' + item.id} title={title}
            className={glyph ? 'm1-has-mobile-glyph' : undefined}
            aria-label={title} aria-current={route === item.id ? 'page' : undefined} onClick={close}>
            <Icon name={pageIcons[item.id]} />
            {glyph && <span className={'m1-mobile-glyph m1-mobile-glyph-' + item.id} aria-hidden="true">{glyph}</span>}
            <span className="nav-label">{title}</span><span className="m1-mobile-chevron" aria-hidden="true">›</span>
          </a>
        })}
      </div>
    </div>
  }

  return <aside id="navegacion" className={'sidebar m1-sidebar' + (mobileOpen ? ' abierto' : '')}
    role={mobileOpen ? 'dialog' : undefined} aria-modal={mobileOpen ? true : undefined}
    aria-label={mobileOpen ? 'Menú de navegación' : undefined}>
    <div className="brand">
      <img src="/escudo.png" alt="" width="48" height="48" />
      <div className="m1-brand-text"><strong>I.E. Mariscal Castilla</strong><span className="m1-brand-role">Administrador del sistema</span></div>
      <button className="m1-mobile-close" type="button" aria-label="Cerrar menú" onClick={close}>×</button>
    </div>
    <button className="desktop-toggle m1-sidebar-toggle" type="button" title={label} aria-label={label}
      aria-expanded={expanded} aria-controls="enlaces" onClick={toggle}><Icon name={expanded ? 'toggle' : 'expand'} /></button>
    <nav id="enlaces" aria-label="Administración del sistema">
      <div className="m1-nav-scroll">{navigation.filter(group => group.label !== 'Cuenta').map(renderGroup)}</div>
      {navigation.filter(group => group.label === 'Cuenta').map(renderGroup)}
      <div className="m1-mobile-account">
        <a href="#perfil" aria-label="Mi perfil" onClick={close}>
          <span className="m1-mobile-avatar" aria-hidden="true">TI</span>
          <span><strong>Administrador TI</strong><small>Sesión institucional</small></span>
        </a>
        <a href="#acceso" aria-label="Cerrar sesión" onClick={close}>↪</a>
      </div>
    </nav>
  </aside>
}
