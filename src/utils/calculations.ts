import { Transaction } from '../types'

export function sumByType(transactions: Transaction[], type: 'income' | 'expense') {
  return transactions
    .filter(t => t.type === type)
    .reduce((s, t) => s + t.amount, 0)
}

export function totals(transactions: Transaction[]) {
  const totalIncome = sumByType(transactions, 'income')
  const totalExpenses = sumByType(transactions, 'expense')
  const netChange = totalIncome - totalExpenses
  return { totalIncome, totalExpenses, netChange }
}

export function endBalance(startingBalance: number, transactions: Transaction[]) {
  const { netChange } = totals(transactions)
  return startingBalance + netChange
}

export function savedAmount(startingBalance: number, transactions: Transaction[]) {
  return endBalance(startingBalance, transactions) - startingBalance
}

export function savedPercent(startingBalance: number, transactions: Transaction[]) {
  if (startingBalance === 0) return 0
  const amount = savedAmount(startingBalance, transactions)
  return (amount / startingBalance) * 100
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
}

export const formatPercent = (value: number) => {
  const sign = value >= 0 ? '+' : '-'
  return `${sign}${Math.round(Math.abs(value))}%`
}
