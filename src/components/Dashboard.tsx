import React from 'react'
import SummaryCard from './SummaryCard'
import { StartEndBar, PlannedActualBar } from './SummaryChart'
import { Transaction } from '../types'
import { totals, endBalance, savedAmount, savedPercent } from '../utils/calculations'

export default function Dashboard({ startingBalance, transactions }: { startingBalance: number, transactions: Transaction[] }) {
  const { totalIncome, totalExpenses } = totals(transactions)
  const end = endBalance(startingBalance, transactions)
  const saved = savedAmount(startingBalance, transactions)
  const percent = savedPercent(startingBalance, transactions)

  return (
    <div>
      <div className="summary-row" style={{ marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <StartEndBar start={startingBalanceXXX} end={end} />
        </div>
        <div style={{ width: 320 }}>
          <SummaryCard percent={percent} amount={saved} />
          <div style={{ marginTop: 12 }} className="highlight-note">Only edit highlighted items (starting balance and transactions)</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <h4>Expenses</h4>
          <PlannedActualBar planned={0} actual={totalExpenses} label="Expenses" />
        </div>
        <div>
          <h4>Income</h4>
          <PlannedActualBar planned={0} actual={totalIncome} label="Income" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        <div>
          <h4>Expenses by Category</h4>
          <table className="table">
            <thead><tr><th>Category</th><th>Planned</th><th>Actual</th><th>Diff</th></tr></thead>
            <tbody>
              {aggregate(transactions.filter(t => t.type === 'expense')).map(r => (
                <tr key={r.category}>
                  <td>{r.category}</td>
                  <td>{formatNum(r.planned)}</td>
                  <td>{formatNum(r.actual)}</td>
                  <td>{formatNum(r.actual - r.planned)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4>Income by Category</h4>
          <table className="table">
            <thead><tr><th>Category</th><th>Planned</th><th>Actual</th><th>Diff</th></tr></thead>
            <tbody>
              {aggregate(transactions.filter(t => t.type === 'income')).map(r => (
                <tr key={r.category}>
                  <td>{r.category}</td>
                  <td>{formatNum(r.planned)}</td>
                  <td>{formatNum(r.actual)}</td>
                  <td>{formatNum(r.actual - r.planned)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function aggregate(items: Transaction[]) {
  const map: Record<string, { category: string, planned: number, actual: number }> = {}
  items.forEach(i => {
    const key = i.category
    if (!map[key]) map[key] = { category: key, planned: i.plannedAmount || 0, actual: 0 }
    map[key].actual += i.amount
  })
  return Object.values(map)
}

function formatNum(n: number) { return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n) }
