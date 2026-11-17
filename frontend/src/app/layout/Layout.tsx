import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Sidebar } from '../../compartido/navegacion/Sidebar'
import { Button, Panel } from '../../compartido/componentes'
import './layout.css'

const mobileQuery = '(max-width: 600px)'

export function Layout({ route, routeKey = route, group, title, sectionTitle, children }: {
  route: string; routeKey?: string; group?: string; title?: string; sectionTitle?: string; children: ReactNode
}) {
  const [expanded, setExpanded] = useState(() => !matchMedia('(max-width: 1000px)').matches)
  const [mobile, setMobile] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const mobileButton = useRef<HTMLButtonElement>(null)
  const notificationButton = useRef<HTMLButtonElement>(null)
  const headerActions = useRef<HTMLDivElement>(null)
  useEffect(() => { setMobile(false); setNotifications(false) }, [routeKey, title])
  useEffect(() => {
    const viewport = matchMedia(mobileQuery)
    const closePanels = () => { setMobile(false); setNotifications(false) }
    viewport.addEventListener('change', closePanels)
    return () => viewport.removeEventListener('change', closePanels)
  }, [])
  useEffect(() => {
    if (!mobile && !notifications) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (mobile) setMobile(false)
      if (notifications) { setNotifications(false); notificationButton.current?.focus() }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (notifications && event.target instanceof Node && !headerActions.current?.contains(event.target)) setNotifications(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [mobile, notifications])
  useEffect(() => {
    if (!mobile) return
    const menu = document.getElementById('navegacion')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menu?.querySelector<HTMLButtonElement>('.m1-mobile-close')?.focus()
    const keepFocusInMenu = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !menu) return
      const items = [...menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
        .filter(element => element.getClientRects().length > 0)
      const first = items[0]
      const last = items.at(-1)
      if (event.shiftKey && (document.activeElement === first || !menu.contains(document.activeElement))) {
        event.preventDefault(); last?.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !menu.contains(document.activeElement))) {
        event.preventDefault(); first?.focus()
      }
    }
    document.addEventListener('keydown', keepFocusInMenu)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', keepFocusInMenu)
      if (matchMedia(mobileQuery).matches) mobileButton.current?.focus()
    }
  }, [mobile])

  const breadcrumb = <>{group && group !== 'Inicio' && <>{group} / </>}
    {sectionTitle && <><a href={'#' + route}>{sectionTitle}</a> / </>}
    <span aria-current="page">{title ?? 'Administrar sistema'}</span>
  </>

  return <div className={'layout m1-layout' + (expanded ? '' : ' compact')}>
    <a className="skip-link" href="#contenido" onClick={event => { event.preventDefault(); document.getElementById('contenido')?.focus() }}>Saltar al contenido</a>
    {mobile && <button type="button" tabIndex={-1} className="m1-scrim" aria-label="Cerrar menú" onClick={() => setMobile(false)} />}
    <Sidebar route={route} routeKey={routeKey} expanded={expanded} mobileOpen={mobile} toggle={() => setExpanded(value => !value)} close={() => setMobile(false)} />
    <div className="workspace" inert={mobile || undefined}>
      <header className="topbar m1-header">
        <button ref={mobileButton} className="mobile-toggle" type="button" aria-label={mobile ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobile}
          aria-controls="navegacion" onClick={() => setMobile(value => !value)}>☰</button>
        <div className="m1-mobile-brand"><img src="/escudo.png" alt="" width="40" height="40" />I.E. Mariscal Castilla</div>
        <nav className="m1-breadcrumb" aria-label="Ruta de navegación">{breadcrumb}</nav>
        <div ref={headerActions} className="m1-header-actions">
          <Button ref={notificationButton} className="m1-notifications-trigger" aria-label="Notificaciones"
            aria-expanded={notifications} aria-controls={notifications ? 'panel-notificaciones' : undefined}
            onClick={() => setNotifications(value => !value)}>
            <img src="/campana.svg" alt="" />
          </Button>
          <a href="#perfil" className="m1-avatar" aria-label="Mi perfil">TI</a>
          {notifications && <Panel id="panel-notificaciones" title="Notificaciones" onClose={() => { setNotifications(false); notificationButton.current?.focus() }}><p>No hay notificaciones nuevas.</p></Panel>}
        </div>
      </header>
      <main id="contenido" tabIndex={-1} className="content">
        <nav className="m1-mobile-breadcrumb" aria-label="Ruta de navegación">{breadcrumb}</nav>
        {children}
      </main>
    </div>
  </div>
}
