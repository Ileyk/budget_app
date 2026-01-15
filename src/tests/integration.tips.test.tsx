import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

beforeEach(() => localStorage.clear())

describe('Tip integration', () => {
  it('shows Tip button in the header and opens modal', async () => {
    render(<App />)
    const btn = screen.getByTestId('tip-button')
    expect(btn).toBeTruthy()
    fireEvent.click(btn)
    expect(await screen.findByRole('dialog')).toBeTruthy()
  })
})
