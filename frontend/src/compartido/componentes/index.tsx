import { createContext, useContext, useEffect, useId, useRef, useState } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import './componentes.css'

export function Button({ variant = 'secondary', className = '', type = 'button', ...props }: ComponentPropsWithRef<'button'> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  return <button {...props} type={type} className={'m1-button m1-' + variant + ' ' + className} />
}

export function ConfirmDialog({ title, children, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', danger, onClose, onConfirm }: {
  title: string; children: ReactNode; confirmLabel?: string; cancelLabel?: string; danger?: boolean; onClose: () => void; onConfirm: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const id = useId()
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])
  return <dialog ref={ref} aria-labelledby={id} className="m1-dialog" onCancel={event => { event.preventDefault(); onClose() }}>
    <header><h2 id={id}>{title}</h2><Button aria-label="Cerrar" onClick={onClose}>×</Button></header>
    <div className="m1-dialog-body">{children}</div>
    <footer><Button autoFocus onClick={onClose}>{cancelLabel}</Button>
      <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button></footer>
  </dialog>
}

export function UnsavedDialog({ onStay, onDiscard }: { onStay: () => void; onDiscard: () => void }) {
  return <ConfirmDialog title="Hay cambios sin guardar" cancelLabel="Seguir editando" confirmLabel="Salir sin guardar" danger onClose={onStay} onConfirm={onDiscard}>
    Los cambios que hiciste se perderán si sales de esta pantalla.
  </ConfirmDialog>
}

type Notice = { message: string; type: 'success' | 'warning' | 'error' }
const NoticeContext = createContext<((notice: Notice) => void) | null>(null)

export function Notifications({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<Notice>()
  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(undefined), 5000)
    return () => window.clearTimeout(timeout)
  }, [notice])
  return <NoticeContext.Provider value={setNotice}>
    {children}
    {notice && <div className={'m1-notice m1-notice-' + notice.type}>
      <span role={notice.type === 'error' ? 'alert' : 'status'}>{notice.message}</span>
      <Button aria-label="Cerrar aviso" onClick={() => setNotice(undefined)}>×</Button>
    </div>}
  </NoticeContext.Provider>
}

export function useNotify() {
  const notify = useContext(NoticeContext)
  if (!notify) throw new Error('useNotify requiere el proveedor Notifications.')
  return notify
}

export function Panel({ title, children, onClose }: { title: string; children: ReactNode; onClose?: () => void }) {
  const id = useId()
  return <section className="m1-panel" aria-labelledby={id} onKeyDown={event => { if (event.key === 'Escape') onClose?.() }}>
    <header><h2 id={id}>{title}</h2>{onClose && <Button aria-label="Cerrar panel" onClick={onClose}>×</Button>}</header>
    <div className="m1-panel-body">{children}</div>
  </section>
}

export function Dropdown({ label, options }: { label: string; options: { label: string; onSelect: () => void }[] }) {
  const ref = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (ref.current?.open && event.target instanceof Node && !ref.current.contains(event.target)) ref.current.open = false
    }
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false
        ref.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeWithEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeWithEscape)
    }
  }, [])
  return <details ref={ref} className="m1-dropdown">
    <summary>{label}</summary><ul>{options.map(option => <li key={option.label}><Button onClick={() => {
      if (ref.current) { ref.current.open = false; ref.current.querySelector('summary')?.focus() }
      option.onSelect()
    }}>{option.label}</Button></li>)}</ul>
  </details>
}
