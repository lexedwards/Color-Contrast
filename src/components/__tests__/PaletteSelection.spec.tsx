import React from 'react'
import { render } from '../../tests/renderWithStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PaletteSelection from '../PaletteSelection'

describe('It can select palettes when available', () => {

  test('It Renders', () => {
    render(<PaletteSelection />)
    expect(screen.getByRole('combobox'))
    expect(screen.getByRole('option', { name: /select palette/i })).toBeDisabled()
  })

  const testState = {
    palettes: {
      'test-uuid': 'Example',
      'anot-her1-234': 'Another'
    }
  }

  test('Can select palettes', () => {
    render(<PaletteSelection />, { initState: testState })
    expect(screen.getByRole('combobox'))
    expect(screen.getAllByRole('option')).toHaveLength(3)
    userEvent.selectOptions(screen.getByRole('combobox'), 'test-uuid')
    expect(screen.getByRole('combobox')).toHaveValue('test-uuid')
    expect(screen.getByRole('combobox')).toHaveLength(2)
  })

})
