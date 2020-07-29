import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../tests/renderWithStore'
import Header from '../Header'

describe('Renders the Header', () => {

  test('Renders with Header text', () => {
    render(<Header />)
    expect(screen.getByRole('banner'))
    expect(screen.getByRole('heading')).toHaveTextContent(/color contrast ratios/i)
    expect(screen.getByRole('combobox')).toHaveValue('Select Palette')
    expect(screen.getAllByRole('button')).toHaveLength(6)
  })

  test('Renders Info Panel', () => {
    render(<Header />)
    userEvent.click(screen.getByRole('button', { name: /more info/i }))
    expect(screen.getByRole('heading', { name: /color contrast$/i })).toBeInTheDocument()
    userEvent.click(document.body)
    expect(screen.queryByRole('heading', { name: /color contrast$/i })).not.toBeInTheDocument()
  })

  test('Renders New Wcag Guidence', () => {
    render(<Header />)
    userEvent.click(screen.getByRole('button', { name: /wcag 2.1?/i }))
    expect(screen.getByRole('heading', { name: /wcag complience/i })).toBeInTheDocument()
    userEvent.click(document.body)
    expect(screen.queryByRole('heading', { name: /wcag complience/i })).not.toBeInTheDocument()
  })

  test('Renders New Palette window', () => {
    render(<Header />)
    userEvent.click(screen.getByRole('button', { name: /new/i }))
    expect(screen.getByRole('heading', { name: /add new palette/i })).toBeInTheDocument()
    userEvent.click(document.body)
    expect(screen.queryByRole('heading', { name: /add new palette/i })).not.toBeInTheDocument()
  })

  test('Renders Config window', () => {
    render(<Header />)
    userEvent.click(screen.getByRole('button', { name: /open config panel/i }))
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
    userEvent.click(document.body)
    expect(screen.queryByRole('heading', { name: /settings/i })).not.toBeInTheDocument()
  })


})