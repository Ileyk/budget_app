import { tips, Tip } from '../data/tips'

const LAST_SEEN_KEY = 'tips.lastSeenDate'

function formatDateYMD(d: Date) {
  return d.toISOString().slice(0, 10)
}

export function getTipForDate(date: Date = new Date(), locale?: string): Tip {
  const daysSinceEpoch = Math.floor(date.getTime() / 86400000)
  const index = daysSinceEpoch % tips.length
  return tips[index]
}

export function getTipTextForDate(date: Date = new Date(), locale?: string) {
  const tip = getTipForDate(date, locale)
  const lang = (locale || (typeof navigator !== 'undefined' ? navigator.language : 'en')).toLowerCase()
  return lang.startsWith('es') ? tip.text.es : tip.text.en
}

export function markSeen(date: Date = new Date()) {
  localStorage.setItem(LAST_SEEN_KEY, formatDateYMD(date))
}

export function hasSeen(date: Date = new Date()) {
  const stored = localStorage.getItem(LAST_SEEN_KEY)
  return stored === formatDateYMD(date)
}

export default function useTips() {
  const today = new Date()
  return {
    tip: getTipForDate(today),
    text: getTipTextForDate(today),
    hasSeen: hasSeen(today),
    markSeen: () => markSeen(today)
  }
}
