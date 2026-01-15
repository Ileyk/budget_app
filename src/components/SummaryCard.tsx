import React from 'react'
import { formatCurrency, formatPercent } from '../utils/calculations'

export default function SummaryCard({ percent, amount }: { percent: number, amount: number }) {
  return (
    <div className="saving-card">
      <div className="percent">{formatPercent(percent)}</div>
      <div className="small-muted">Increase in total savings</div>
      <h3 style={{ marginTop: 8 }}>{formatCurrency(amount)}</h3>
      <div className="small-muted">Saved this month</div>
    </div>
  )
}
