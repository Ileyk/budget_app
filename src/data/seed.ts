import { Transaction } from '../types'

export const seedStartingBalance = 10000

export const seedTransactions: Transaction[] = [
  { id: 't1', date: '2026-01-01', type: 'income', amount: 2570, category: 'Paycheck' },
  { id: 't2', date: '2026-01-02', type: 'income', amount: 3950, category: 'Rent' },
  { id: 't3', date: '2026-01-03', type: 'income', amount: 500, category: 'Royalties' },
  { id: 't4', date: '2026-01-04', type: 'expense', amount: 815, category: 'Entertainment' },
  { id: 't5', date: '2026-01-05', type: 'expense', amount: 2470, category: 'Business' },
  { id: 't6', date: '2026-01-06', type: 'expense', amount: 2133, category: 'Home' },
  { id: 't7', date: '2026-01-07', type: 'expense', amount: 700, category: 'Parents' },
  { id: 't8', date: '2026-01-08', type: 'expense', amount: 150, category: 'Auto' },
  { id: 't9', date: '2026-01-09', type: 'expense', amount: 30, category: 'Fitness' }
]
