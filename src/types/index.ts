export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  date: string // ISO
  type: TransactionType
  amount: number
  plannedAmount?: number
  category: string
  notes?: string
  tags?: string[]
}

export interface AppState {
  startingBalance: number
  transactions: Transaction[]
}
