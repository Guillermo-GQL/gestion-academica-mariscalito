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
  return <Notifications><Layout route={route} group={page?.group} title={page?.title}>
    {View ? <View /> : <><h1>{page?.title ?? 'Pantalla no encontrada'}</h1>
      {page ? <p>Sección en preparación.</p> : <a href="#panel">Volver al panel</a>}</>}
  </Layout></Notifications>
}
