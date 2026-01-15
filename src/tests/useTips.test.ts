import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getTipForDate, getTipTextForDate, markSeen, hasSeen } from '../hooks/useTips'

beforeEach(() => {
  localStorage.clear()
})

describe('useTips utilities', () => {
  it('returns deterministic tip for a fixed date', () => {
    const d = new Date('2026-01-01T00:00:00Z')
    const t = getTipForDate(d)
    expect(t).toBeTruthy()
  })

  it('returns Spanish text when locale is es', () => {
    const d = new Date('2026-01-01T00:00:00Z')
    const text = getTipTextForDate(d, 'es-ES')
    // deterministic mapping: ensure we return the Spanish variant for the same tip
    const tip = getTipForDate(d)
    expect(text).toBe(tip.text.es)
  })

  it('markSeen and hasSeen work', () => {
    const d = new Date('2026-01-02T00:00:00Z')
    expect(hasSeen(d)).toBe(false)
    markSeen(d)
    expect(hasSeen(d)).toBe(true)
  })
})
