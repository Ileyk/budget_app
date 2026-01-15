import { useEffect, useState } from 'react' // import React hooks for state and side effects
import { Transaction } from '../types' // import the Transaction type definition from src/types/index.ts
import { seedStartingBalance, seedTransactions } from '../data/seed' // import seeded default data

const STORAGE_KEY = 'barcelona-flat-budget-v1' // key used to persist app data in localStorage

export function useTransactions() { // custom hook that manages transactions + starting balance
  const [transactions, setTransactions] = useState<Transaction[]>(() => { // state for transactions, initialized lazily
    try {
      const raw = localStorage.getItem(STORAGE_KEY) // read persisted JSON from localStorage
      if (!raw) return seedTransactions // if nothing saved, fall back to seeded transactions
      const parsed = JSON.parse(raw) // parse saved JSON
      return parsed.transactions || seedTransactions // return stored transactions or fallback to seed
    } catch {
      return seedTransactions // on parse/read error, fallback to seed
    }
  })

  const [startingBalance, setStartingBalance] = useState<number>(() => { // state for starting balance, initialized lazily
    try {
      const raw = localStorage.getItem(STORAGE_KEY) // read persisted JSON from localStorage
      if (!raw) return seedStartingBalance // if nothing saved, fall back to seeded starting balance
      const parsed = JSON.parse(raw) // parse saved JSON
      return parsed.startingBalance ?? seedStartingBalance // return stored startingBalance or fallback
    } catch {
      return seedStartingBalance // on error, fallback to seed
    }
  })

  useEffect(() => { // effect to persist state whenever startingBalance or transactions change
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ startingBalance, transactions })) // serialize and save
  }, [startingBalance, transactions]) // dependencies trigger save on change

  function addTransaction(t: Transaction) { // add a new transaction to the start of the list
    setTransactions(prev => [t, ...prev])
  }
  function updateTransaction(id: string, partial: Partial<Transaction>) { // update transaction by id with partial fields
    setTransactions(prev => prev.map(p => p.id === id ? { ...p, ...partial } : p))
  }
  function deleteTransaction(id: string) { // remove transaction by id
    setTransactions(prev => prev.filter(p => p.id !== id))
  }

  function exportCSV() { // convert transactions to a CSV Blob for download
    const rows = transactions.map(t => [t.id, t.date, t.type, t.amount, t.plannedAmount ?? '', t.category, (t.tags||[]).join('|'), (t.notes||'')]) // build rows
    const csv = ['id,date,type,amount,plannedAmount,category,tags,notes', ...rows.map(r => r.join(','))].join('\n') // join header + rows
    return new Blob([csv], { type: 'text/csv' }) // return as Blob
  }

  async function importCSV(file: File) { // read a CSV File and merge parsed transactions into state
    const text = await file.text() // read file contents as text
    const lines = text.split(/\r?\n/).slice(1) // split into lines and drop header
    const parsed: Transaction[] = lines
      .map(l => l.split(',')) // split each line by comma
      .filter(r => r.length >= 6) // ensure minimum columns present
      .map(([id, date, type, amount, plannedAmount, category, tags, notes]) => ({ // map columns to Transaction shape
        id: id || String(Math.random()).slice(2), // generate id if missing
        date: date || new Date().toISOString().slice(0,10), // fallback date if missing
        type: (type as 'income' | 'expense') || 'expense', // coerce type
        amount: Number(amount) || 0, // parse amount
        plannedAmount: plannedAmount ? Number(plannedAmount) : undefined, // parse planned amount if present
        category: category || 'Other', // fallback category
        tags: tags ? tags.split('|') : [], // parse tags pipe-delimited
        notes: notes || '' // fallback notes
      }))
    setTransactions(prev => [...parsed, ...prev]) // prepend imported transactions to existing list
  }

  return { transactions, startingBalance, setStartingBalance, addTransaction, updateTransaction, deleteTransaction, exportCSV, importCSV } // expose API
}
