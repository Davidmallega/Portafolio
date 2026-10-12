import { useEffect, useRef } from 'react'

// Modal a11y: Escape cierra, el foco entra al diálogo al abrir y vuelve
// al elemento que lo abrió al cerrar. Devuelve el ref del contenedor.
export function useModalA11y(onClose) {
  const containerRef = useRef(null)
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const opener = document.activeElement
    containerRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeRef.current?.()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [])

  return containerRef
}
