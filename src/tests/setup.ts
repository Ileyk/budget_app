import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

vi.mock('react-chartjs-2', () => {
  return {
    Bar: (props: any) => React.createElement('div', { 'data-testid': 'chart' })
  }
})
