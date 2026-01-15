import React, { useState } from 'react'
import { Transaction } from '../types'

export default function TransactionForm({ onSave }: { onSave: (t: Transaction) => void }) {
  const [type, setType] = useState<'income'|'expense'>('expense')
  const [amount, setAmount] = useState<number>(0)
  const [category, setCategory] = useState('Other')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [notes, setNotes] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const t: Transaction = { id: String(Math.random()).slice(2), date, type, amount: Number(amount), category, notes }
    onSave(t)
    setAmount(0)
    setNotes('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'grid', gap:8 }}>
      <div className="form-row">
        <select value={type} onChange={e => setType(e.target.value as any)} className="input">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input className="input" value={amount} onChange={e=>setAmount(Number(e.target.value))} type="number" placeholder="Amount" />
        <input className="input" value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" />
      </div>
      <div className="form-row">
        <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input className="input" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" />
        <button className="btn" type="submit">Add</button>
      </div>
    </form>
  )
}
