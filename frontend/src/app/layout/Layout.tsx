import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Sidebar } from '../../compartido/navegacion/Sidebar'
import { Button, Panel } from '../../compartido/componentes'
import './layout.css'

export function Layout({ route, group, title, children }: { route: string; group?: string; title?: string; children: ReactNode }) {
  const [expanded, setExpanded] = useState(() => !matchMedia('(max-width: 1000px)').matches)
  const [mobile, setMobile] = useState(false)
  const [notifications, setNotifications] = useState(false)
  useEffect(() => { setMobile(false); setNotifications(false) }, [route])
  return <div className={'layout m1-layout' + (expanded ? '' : ' compact')}>
    <a className="skip-link" href="#contenido" onClick={event => { event.preventDefault(); document.getElementById('contenido')?.focus() }}>Saltar al contenido</a>
    {mobile && <button type="button" className="m1-scrim" aria-label="Cerrar menú" onClick={() => setMobile(false)} />}
    <Sidebar route={route} expanded={expanded} mobileOpen={mobile} toggle={() => setExpanded(value => !value)} close={() => setMobile(false)} />
    <div className="workspace">
      <header className="topbar m1-header">
        <button className="mobile-toggle" type="button" aria-label={mobile ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobile}
          aria-controls="navegacion" onClick={() => setMobile(value => !value)} onKeyDown={event => { if (event.key === 'Escape') setMobile(false) }}>☰</button>
        <div className="m1-mobile-brand"><img src="/escudo.png" alt="" width="42" height="42" />I.E. Mariscal Castilla</div>
        <nav className="m1-breadcrumb" aria-label="Ruta de navegación">{group && group !== 'Inicio' && <>{group} / </>}<span aria-current="page">{title ?? 'Administrar sistema'}</span></nav>
        <div className="m1-header-actions">
          <Button aria-label="Notificaciones" aria-expanded={notifications} onClick={() => setNotifications(value => !value)}>
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
