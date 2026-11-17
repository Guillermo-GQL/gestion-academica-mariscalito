import { useEffect, useState } from 'react'
import { pages, readRoute } from './rutas'
import { Layout } from './layout/Layout'
import { Notifications } from '../compartido/componentes'

export function App() {
  const [route, setRoute] = useState(readRoute)
  useEffect(() => {
    const sync = () => setRoute(readRoute())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  const page = pages.find(item => item.id === route)
  const View = page?.View
  const content = View ? <View /> : <>
    <h1>{page?.title ?? 'Pantalla no encontrada'}</h1>
    {page ? <p>Sección en preparación.</p> : <a href="#panel">Volver al panel</a>}
  </>
  return <Notifications>{page?.standalone
    ? View ? content : <main id="contenido" tabIndex={-1} className="content">{content}</main>
    : <Layout route={page?.navigationId ?? route} routeKey={route} group={page?.group} title={page?.title} sectionTitle={page?.sectionTitle}>
        {content}
      </Layout>}
  </Notifications>
}
