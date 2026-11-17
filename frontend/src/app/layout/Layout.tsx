import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Sidebar } from '../../compartido/navegacion/Sidebar'
import { Button, Panel } from '../../compartido/componentes'
import './layout.css'

export function Layout({ route, group, title, sectionTitle, children }: {
  route: string; group?: string; title?: string; sectionTitle?: string; children: ReactNode
}) {
  const [expanded, setExpanded] = useState(() => !matchMedia('(max-width: 1000px)').matches)
  const [mobile, setMobile] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const mobileButton = useRef<HTMLButtonElement>(null)
  const notificationButton = useRef<HTMLButtonElement>(null)
  const headerActions = useRef<HTMLDivElement>(null)
  useEffect(() => { setMobile(false); setNotifications(false) }, [route, title])
  useEffect(() => {
    const viewport = matchMedia('(max-width: 780px)')
    const closeMobile = () => setMobile(false)
    viewport.addEventListener('change', closeMobile)
    return () => viewport.removeEventListener('change', closeMobile)
  }, [])
  useEffect(() => {
    if (!mobile && !notifications) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (mobile) { setMobile(false); mobileButton.current?.focus() }
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
  return <div className={'layout m1-layout' + (expanded ? '' : ' compact')}>
    <a className="skip-link" href="#contenido" onClick={event => { event.preventDefault(); document.getElementById('contenido')?.focus() }}>Saltar al contenido</a>
    {mobile && <button type="button" className="m1-scrim" aria-label="Cerrar menú" onClick={() => setMobile(false)} />}
    <Sidebar route={route} expanded={expanded} mobileOpen={mobile} toggle={() => setExpanded(value => !value)} close={() => setMobile(false)} />
    <div className="workspace">
      <header className="topbar m1-header">
        <button ref={mobileButton} className="mobile-toggle" type="button" aria-label={mobile ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobile}
          aria-controls="navegacion" onClick={() => setMobile(value => !value)}>☰</button>
        <div className="m1-mobile-brand"><img src="/escudo.png" alt="" width="42" height="42" />I.E. Mariscal Castilla</div>
        <nav className="m1-breadcrumb" aria-label="Ruta de navegación">{group && group !== 'Inicio' && <>{group} / </>}
          {sectionTitle && <><a href={'#' + route}>{sectionTitle}</a> / </>}
          <span aria-current="page">{title ?? 'Administrar sistema'}</span>
        </nav>
        <div ref={headerActions} className="m1-header-actions">
          <Button ref={notificationButton} aria-label="Notificaciones" aria-expanded={notifications} onClick={() => setNotifications(value => !value)}>
            <img src="/campana.svg" alt="" />
          </Button>
          <a href="#perfil" className="m1-avatar" aria-label="Mi perfil">TI</a>
          {notifications && <Panel title="Notificaciones" onClose={() => setNotifications(false)}><p>No hay notificaciones nuevas.</p></Panel>}
        </div>
      </header>
      <main id="contenido" tabIndex={-1} className="content">{children}</main>
    </div>
  </div>
}
