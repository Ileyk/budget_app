import React from 'react'
import { useTransactions } from './hooks/useTransactions'
import Dashboard from './components/Dashboard'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import TipButton from './components/TipButton'

export default function App() {
  const { transactions, startingBalance, setStartingBalance, addTransaction, deleteTransaction, exportCSV, importCSV } = useTransactions()

  async function handleFile(ev: React.ChangeEvent<HTMLInputElement>) {
    if (!ev.target.files?.[0]) return
    await importCSV(ev.target.files[0])
    ev.target.value = ''
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Barcelona Flat Budget</h2>
        <div style={{ display:'flex', gap:8, alignItems: 'center' }}>
          <input className="input" type="number" value={startingBalance} onChange={e => setStartingBalance(Number(e.target.value))} />
          <span className="legend"> Starting balance</span>
          <div style={{ marginLeft: 8 }}>
            <TipButton />
          </div>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <div>
          <Dashboard startingBalance={startingBalance} transactions={transactions} />

          <h3 style={{ marginTop: 18 }}>Transactions</h3>
          <div style={{ marginBottom: 8 }}>
            <TransactionForm onSave={addTransaction} />
          </div>
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
        <aside>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn" onClick={() => { const blob = exportCSV(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click(); URL.revokeObjectURL(url)}}>Export CSV</button>
            <label className="btn secondary" style={{ display:'inline-block' }}>Import CSV<input type="file" onChange={handleFile} style={{ display:'none' }} /></label>
          </div>

          <div style={{ marginTop: 12 }}>
            <h4>Notes</h4>
            <p className="small-muted">Only edit highlighted items (starting balance and transaction entries). Chart and summary update automatically.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
