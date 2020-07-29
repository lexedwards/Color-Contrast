import React from 'react'
import { render } from '../../../tests/renderWithStore'
import { screen } from '@testing-library/react'

import ConfigPanel from '../ConfigPanel'
import userEvent from '@testing-library/user-event'

describe('Config Panel', () => {

  const mockClose = jest.fn()

  const mockState: RootState = {
    background: '#FFF',
    contrast: {},
    labels: { 'test-uuid': ['one', 'two', 'three'] },
    palettes: { 'test-uuid': 'Example' },
    selected: {
      overlay: 'hex' as OverlayOptions,
      paletteKey: 'test-uuid',
    },
    shades: {}
  }

  test('It renders and closes', () => {
    render(<ConfigPanel close={mockClose} />)
    expect(screen.getAllByRole('heading')).toHaveLength(2)
    userEvent.click(screen.getByRole('heading', { name: /settings/i }))
    expect(mockClose).not.toHaveBeenCalled()
    userEvent.click(document.body)
    expect(mockClose).toHaveBeenCalled()
  })

  test('Handles Deletion of Pallete', () => {
    render(<ConfigPanel close={mockClose} />, { initState: mockState })
    userEvent.click(screen.getByRole('button', { name: /delete palette/i }))
    expect(mockClose).toHaveBeenCalled()
  })

  test('Accepts user input', async () => {
    render(<ConfigPanel close={mockClose} />, { initState: mockState })
    const inputField = screen.getByRole('textbox')
    expect(inputField).toHaveValue('#FFF')
    userEvent.clear(inputField)
    userEvent.click(screen.getByRole('button', { name: /save background/i }))
    expect(screen.getByText(/error/i))
    await userEvent.type(inputField, `#ccc`)
    expect(inputField).toHaveValue('#ccc')
    userEvent.click(screen.getByRole('button', { name: /save background/i }))
    expect(inputField).toHaveValue('#ccc')
  })

})