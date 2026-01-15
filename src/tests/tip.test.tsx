import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import TipButton from '../components/TipButton'

beforeEach(() => localStorage.clear())

describe('TipButton', () => {
  it('renders button and opens modal', async () => {
    render(<TipButton />)
    const btn = screen.getByTestId('tip-button')
    expect(btn).toBeTruthy()
    fireEvent.click(btn)
    expect(await screen.findByRole('dialog')).toBeTruthy()
    const close = screen.getByTestId('tip-close')
    fireEvent.click(close)
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
