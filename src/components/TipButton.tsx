import React, { useEffect, useRef, useState } from 'react'
import { getTipTextForDate, hasSeen, markSeen } from '../hooks/useTips'

export default function TipButton({ locale }: { locale?: string }) {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState<boolean>(() => hasSeen())
  const prevActive = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      prevActive.current = document.activeElement as HTMLElement
      // focus will be moved to the close button after render
    } else {
      // restore focus
      prevActive.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function handleOpen() {
    setOpen(true)
    setSeen(hasSeen())
  }
  function handleMarkSeen() {
    markSeen()
    setSeen(true)
  }

  return (
    <>
      <button aria-label="Show tip of the day" className="btn" onClick={handleOpen} data-testid="tip-button">Tip of the day</button>
      {open && (
        <div className="tip-overlay" role="presentation">
          <div className="tip-modal" role="dialog" aria-modal="true" aria-labelledby="tip-title">
            <h3 id="tip-title">Tip of the day</h3>
            <p>{getTipTextForDate(new Date(), locale)}</p>
            <div className="tip-controls">
              <button className="tip-button btn secondary" onClick={() => setOpen(false)} data-testid="tip-close">Close</button>
              <button className="tip-button btn" onClick={handleMarkSeen} data-testid="tip-mark-seen">{seen ? 'Seen' : 'Mark as seen'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
