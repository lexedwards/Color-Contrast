import React from 'react'
import { render } from '../../tests/renderWithStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OverlaySelection from '../OverlaySelection'

describe('Renders the Overlay dropdown', () => {

  test('It renders with Options', () => {
    render(<OverlaySelection />)
    expect(screen.getByRole('combobox')).toHaveValue('hex')
  })

  test('Defaults to Hex as a value without state', () => {
    render(<OverlaySelection />, { initState: { selected: {} } })
    expect(screen.getByRole('combobox')).toHaveValue('hex')
  })

  test('It has the right options', () => {
    render(<OverlaySelection />)
    expect(screen.getAllByRole('option')).toHaveLength(5)
  })

  test('It can cycle through the selections', async () => {
    render(<OverlaySelection />)
    expect(screen.getByRole('combobox')).toHaveValue('hex')
    userEvent.selectOptions(screen.getByRole('combobox'), 'rgb')
    expect(screen.getByRole('combobox')).toHaveValue('rgb')
    userEvent.selectOptions(screen.getByRole('combobox'), 'hsl')
    expect(screen.getByRole('combobox')).toHaveValue('hsl')
    userEvent.selectOptions(screen.getByRole('combobox'), 'lab')
    expect(screen.getByRole('combobox')).toHaveValue('lab')
    userEvent.selectOptions(screen.getByRole('combobox'), 'wcag')
    expect(screen.getByRole('combobox')).toHaveValue('wcag')
  })

})