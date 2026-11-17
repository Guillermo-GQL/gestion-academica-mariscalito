import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import './componentes.css'

export function Button({ variant = 'secondary', className = '', type = 'button', ...props }: ComponentPropsWithRef<'button'> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  return <button {...props} type={type} className={'m1-button m1-' + variant + ' ' + className} />
}

export function ConfirmDialog({ title, description, children, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', danger, tone = 'default', onClose, onConfirm }: {
  title: string; description?: ReactNode; children: ReactNode; confirmLabel?: string; cancelLabel?: string
  danger?: boolean; tone?: 'default' | 'warning'; onClose: () => void; onConfirm: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const cancelButton = useRef<HTMLButtonElement>(null)
  const id = useId()
  const notices = useContext(NoticeContext)
  const dismiss = notices?.dismiss
  useEffect(() => {
    dismiss?.()
    const dialog = ref.current
    const previousFocus = document.activeElement
    if (dialog && !dialog.open) dialog.showModal()
    cancelButton.current?.focus()
    return () => {
      if (dialog?.open) dialog.close()
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [dismiss])
  const unsaved = tone === 'warning'
  return <dialog ref={ref} aria-labelledby={id} aria-describedby={id + '-body'}
    className={'m1-dialog' + (unsaved ? ' m1-dialog-unsaved' : '')}
    onCancel={event => { event.preventDefault(); onClose() }}>
    <header>
      {unsaved && <span className="m1-dialog-symbol" aria-hidden="true">!</span>}
      <h2 id={id}>{title}</h2>
      {description && <p className="m1-dialog-description">{description}</p>}
      <Button className="m1-close" aria-label="Cerrar" onClick={onClose}>×</Button>
    </header>
    <div id={id + '-body'} className="m1-dialog-body">{children}</div>
    <footer>
      <Button ref={cancelButton} autoFocus className="m1-dialog-cancel" onClick={onClose}>{cancelLabel}</Button>
      <Button className="m1-dialog-confirm" variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
    </footer>
  </dialog>
}

export function UnsavedDialog({ onStay, onDiscard }: { onStay: () => void; onDiscard: () => void }) {
  return <ConfirmDialog title="Hay cambios sin guardar" tone="warning" cancelLabel="No, permanecer" confirmLabel="Sí, salir" onClose={onStay} onConfirm={onDiscard}>
    Hay cambios sin guardar. ¿Deseas salir de esta pantalla?
  </ConfirmDialog>
}

export type Notice = { message: string; description?: string; type: 'success' | 'warning' | 'error' | 'info' }
type ActiveNotice = Notice & { id: number; exiting?: boolean }
const durations: Record<Notice['type'], number> = { success: 4000, warning: 5000, error: 6000, info: 4000 }
const symbols: Record<Notice['type'], string> = { success: '✓', warning: '!', error: '!', info: 'i' }
const NoticeContext = createContext<{ notify: (notice: Notice) => void; dismiss: () => void } | null>(null)

export function Notifications({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<ActiveNotice>()
  const sequence = useRef(0)
  const ref = useRef<HTMLDivElement>(null)
  const notify = useCallback((next: Notice) => setNotice({ ...next, id: ++sequence.current }), [])
  const dismiss = useCallback(() => setNotice(undefined), [])
  const controller = useMemo(() => ({ notify, dismiss }), [notify, dismiss])
  const noticeId = notice?.id
  const duration = notice ? durations[notice.type] : 0
  useEffect(() => {
    if (noticeId === undefined) return
    const fade = window.setTimeout(() => {
      setNotice(previous => previous?.id === noticeId ? { ...previous, exiting: true } : previous)
    }, duration - 180)
    const remove = window.setTimeout(() => {
      setNotice(previous => previous?.id === noticeId ? undefined : previous)
    }, duration)
    return () => { window.clearTimeout(fade); window.clearTimeout(remove) }
  }, [noticeId, duration])
  useEffect(() => {
    window.addEventListener('hashchange', dismiss)
    const onAction = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') return
      if (!(event.target instanceof Element) || ref.current?.contains(event.target)) return
      if (event.target.closest('button, a[href], summary, input[type="submit"]')) dismiss()
    }
    document.addEventListener('pointerdown', onAction, true)
    document.addEventListener('keydown', onAction, true)
    return () => {
      window.removeEventListener('hashchange', dismiss)
      document.removeEventListener('pointerdown', onAction, true)
      document.removeEventListener('keydown', onAction, true)
    }
  }, [dismiss])
  return <NoticeContext.Provider value={controller}>
    {children}
    {notice && <div ref={ref} key={notice.id}
      role={notice.type === 'error' ? 'alert' : 'status'} aria-atomic="true"
      className={'m1-notice m1-notice-' + notice.type + (notice.exiting ? ' m1-notice-exiting' : '')}>
      <span className="m1-notice-symbol" aria-hidden="true">{symbols[notice.type]}</span>
      <div className="m1-notice-content"><strong>{notice.message}</strong>{notice.description && <p>{notice.description}</p>}</div>
      <Button className="m1-close" aria-label="Cerrar aviso" onClick={dismiss}>×</Button>
    </div>}
  </NoticeContext.Provider>
}

export function useNotify() {
  const notices = useContext(NoticeContext)
  if (!notices) throw new Error('useNotify requiere el proveedor Notifications.')
  return notices.notify
}

export function Panel({ id: panelId, title, children, onClose }: { id?: string; title: string; children: ReactNode; onClose?: () => void }) {
  const id = useId()
  return <section id={panelId} className="m1-panel" aria-labelledby={id} onKeyDown={event => { if (event.key === 'Escape') onClose?.() }}>
    <header><h2 id={id}>{title}</h2>{onClose && <Button className="m1-close" aria-label="Cerrar panel" onClick={onClose}>×</Button>}</header>
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
  return <details ref={ref} name="m1-dropdown" className="m1-dropdown" onBlur={event => {
    if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
  }}>
    <summary>{label}</summary><ul>{options.map(option => <li key={option.label}><Button onClick={() => {
      if (ref.current) { ref.current.open = false; ref.current.querySelector('summary')?.focus() }
      option.onSelect()
    }}>{option.label}</Button></li>)}</ul>
  </details>
}
