import { describe, it, expect } from 'vitest'
import { totals, endBalance, savedAmount, savedPercent } from '../utils/calculations'
import { seedStartingBalance, seedTransactions } from '../data/seed'

describe('calculations', () => {
  it('computes total income and expenses from seed', () => {
    const { totalIncome, totalExpenses, netChange } = totals(seedTransactions)
    expect(totalIncome).toBe(7020)
    expect(totalExpenses).toBe(6298)
    expect(netChange).toBe(722)
  })

  it('computes balances and saved percent correctly', () => {
    expect(endBalance(seedStartingBalance, seedTransactions)).toBe(10000 + 722)
    expect(savedAmount(seedStartingBalance, seedTransactions)).toBe(722)
    expect(Math.round(savedPercent(seedStartingBalance, seedTransactions))).toBe(7)
  })
})
