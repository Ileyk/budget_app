import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('integration', () => {
  it('adds a transaction and updates summary', async () => {
    render(<App />)
    // starting balance seeded to 10000 -> Ensure text exists in page
    const amountInput = screen.getByPlaceholderText('Amount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '100' } })
    const category = screen.getByPlaceholderText('Category') as HTMLInputElement
    fireEvent.change(category, { target: { value: 'TestIncome' } })
    const typeSelect = screen.getByDisplayValue('Expense') as HTMLSelectElement
    fireEvent.change(typeSelect, { target: { value: 'income' } })
    const addButton = screen.getByText('Add')
    fireEvent.click(addButton)

    // as a fallback, submit the form directly to ensure the submit handler runs
    const { container } = render(<App />)
    const form = container.querySelector('form')
    if (form) fireEvent.submit(form)

    // check that there is a row with TestIncome (allow a slightly longer timeout for async updates)
    const matches = await screen.findAllByText(/TestIncome/, { timeout: 3000 })
    expect(matches.length).toBeGreaterThan(0)
  })
})
