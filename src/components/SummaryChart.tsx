import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export function StartEndBar({ start, end }: { start: number, end: number }) {
  const data = {
    labels: ['Start', 'End'],
    datasets: [{
      label: 'Balance',
      data: [start, end],
      backgroundColor: ['#2b6cb0', '#ff7b61']
    }]
  }
  const options: any = { responsive: true, plugins: { legend: { display: false } } }
  return <Bar data={data} options={options} />
}

export function PlannedActualBar({ planned, actual, label }: { planned: number, actual: number, label: string }) {
  const actualColor = label === 'Expenses' ? '#e53e3e' : '#2b6cb0'
  const data = {
    labels: [label],
    datasets: [
      { label: 'Planned', data: [planned], backgroundColor: '#cbd5e1' },
      { label: 'Actual', data: [actual], backgroundColor: actualColor }
    ]
  }
  const options: any = { indexAxis: 'y', responsive: true }
  return <Bar data={data} options={options} />
}
