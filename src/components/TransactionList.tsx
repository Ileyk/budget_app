import React from 'react'
import { Transaction } from '../types'
import { formatCurrency } from '../utils/calculations'

export default function TransactionList({ transactions, onDelete }: { transactions: Transaction[], onDelete: (id: string) => void }) {
  return (
    <table className="table">
      <thead>
        <tr><th>Date</th><th>Category</th><th>Type</th><th>Amount</th><th></th></tr>
      </thead>
      <tbody>
        {transactions.map(t => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.category}</td>
            <td>{t.type}</td>
            <td>{formatCurrency(t.amount)}</td>
            <td><button className="btn secondary" onClick={() => onDelete(t.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
