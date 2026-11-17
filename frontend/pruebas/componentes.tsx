import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '../src/compartido/estilos/base.css'
import { Layout } from '../src/app/layout/Layout'
import { pages, readRoute } from '../src/app/rutas'
import { Button, ConfirmDialog, Dropdown, Notifications, UnsavedDialog, useNotify } from '../src/compartido/componentes'
import type { Notice } from '../src/compartido/componentes'
import './componentes.css'

const notices: Notice[] = [
  { type: 'success', message: 'Cuenta creada correctamente', description: 'La invitación segura fue enviada al correo asociado.' },
  { type: 'warning', message: 'Revisa los cambios pendientes', description: 'Guarda o descarta los cambios antes de continuar.' },
  { type: 'error', message: 'No se pudo completar la acción', description: 'Comprueba la conexión e inténtalo nuevamente.' },
  { type: 'info', message: 'Configuración actualizada', description: 'La vista previa ya refleja los últimos cambios.' },
]

export function ComponentProof() {
  const [route, setRoute] = useState(readRoute)
  const [dialog, setDialog] = useState<'confirm' | 'unsaved'>()
  const [result, setResult] = useState('Selecciona una acción para comprobar su resultado.')
  const notify = useNotify()
  useEffect(() => {
    const sync = () => setRoute(readRoute())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  const page = pages.find(item => item.id === route)
  return <Layout route={page?.navigationId ?? 'panel'} routeKey={route} group={page?.group} title={page?.title ?? 'Panel principal'} sectionTitle={page?.sectionTitle}>
    <div className="m1-proof">
      <h1>Pruebas de la base compartida</h1>
      <p>Esta página se utiliza en desarrollo. Las acciones muestran datos de demostración y no modifican cuentas ni registros.</p>
      <section>
        <h2>Notificaciones</h2>
        <p>Debe verse un solo aviso. Éxito e información duran 4 segundos; advertencia, 5; error, 6.</p>
        <div className="m1-proof-actions">
          {notices.map(notice => <Button key={notice.type} onClick={() => notify(notice)}>
            {{ success: 'Éxito', warning: 'Advertencia', error: 'Error', info: 'Información' }[notice.type]}
          </Button>)}
          <Button onClick={() => { notify(notices[0]); notify(notices[3]) }}>Reemplazar aviso</Button>
        </div>
      </section>
      <section>
        <h2>Diálogos y menús desplegables</h2>
        <p>Comprueba confirmar, cancelar, cerrar, Escape y el retorno del foco al control de origen.</p>
        <div className="m1-proof-actions">
          <Button onClick={() => setDialog('confirm')}>Abrir confirmación</Button>
          <Button onClick={() => setDialog('unsaved')}>Cambios sin guardar</Button>
          <Dropdown label="Acciones" options={['Editar', 'Ver historial', 'Restablecer contraseña'].map(label => ({
            label, onSelect: () => setResult('Opción seleccionada: ' + label),
          }))} />
        </div>
        <p className="m1-proof-result" role="status">{result}</p>
      </section>
      <section>
        <h2>Comprobaciones manuales</h2>
        {[
          'Contraer y expandir la barra conserva los íconos y la sección activa.',
          'Las flechas de los grupos permiten cerrar y volver a abrir sus opciones.',
          'La cabecera y el menú permanecen visibles al desplazar el contenido.',
          'La campana abre su panel y permite cerrarlo con Escape o un clic fuera.',
          'Al cambiar de pantalla, abrir un modal o iniciar otra acción se cierra el aviso anterior.',
          'En móvil, el panel se cierra con su botón, Escape, el fondo o una opción de navegación.',
          'En móvil, Tab permanece dentro del panel y la página de fondo no se desplaza.',
          'Los diálogos se adaptan al ancho disponible sin recortar sus botones.',
        ].map(check => <label key={check}><input type="checkbox" />{check}</label>)}
      </section>
      <section className="m1-proof-scroll">
        <h2>Prueba de desplazamiento</h2>
        <p>Desplaza esta página hasta el final y vuelve al inicio para revisar la cabecera fija.</p>
        <p>Compara el menú a 1440 px, 768 px y 390 px de ancho con las referencias de escritorio, tablet y móvil.</p>
      </section>
    </div>
    {dialog === 'confirm' && <ConfirmDialog title="¿Desactivar rol?" description="¿Quieres desactivar el rol «Personal administrativo»?"
      danger confirmLabel="Sí, desactivar" cancelLabel="No, cancelar"
      onClose={() => { setDialog(undefined); setResult('Confirmación cancelada.') }}
      onConfirm={() => { setDialog(undefined); setResult('Confirmación aceptada. No se modificaron datos.'); notify({ type: 'success', message: 'Acción de demostración confirmada' }) }}>
      <div className="m1-confirm-warning"><span aria-hidden="true">!</span><div>
        <strong>Antes de continuar, verifica las cuentas asociadas.</strong>
        <p>La desactivación debe quedar registrada en la auditoría.</p>
      </div></div>
    </ConfirmDialog>}
    {dialog === 'unsaved' && <UnsavedDialog
      onStay={() => { setDialog(undefined); setResult('Se eligió permanecer en la pantalla.') }}
      onDiscard={() => { setDialog(undefined); setResult('Se eligió salir sin guardar. No se modificaron datos.') }} />}
  </Layout>
}

if (typeof document !== 'undefined') {
  createRoot(document.getElementById('root')!).render(<Notifications><ComponentProof /></Notifications>)
}
