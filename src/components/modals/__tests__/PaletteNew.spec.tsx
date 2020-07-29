import React from 'react'
import { render } from '../../../tests/renderWithStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PaletteNew from '../PaletteNew'

describe('New Palette Window', () => {

  const mockClose = jest.fn()

  test('It renders, and closes', () => {
    render(<PaletteNew close={mockClose} />)
    expect(screen.getByRole('heading')).toHaveTextContent(/add new palette/i)
    userEvent.click(screen.getByRole('heading'))
    expect(mockClose).not.toHaveBeenCalled()
    userEvent.click(document.body)
    expect(mockClose).toHaveBeenCalled()
  })

  test('Can populate field with labels', async () => {
    render(<PaletteNew close={mockClose} />)
    const labelInputfield = screen.getByRole('textbox', { name: /palette shades/i })
    const labelAddButton = screen.getByRole('button', { name: /add new label/i })
    await userEvent.type(screen.getByRole('textbox', { name: /palette name/i }), 'Palette Name')
    await userEvent.type(labelInputfield, `100`)
    expect(labelInputfield).toHaveValue('100')
    userEvent.click(labelAddButton)
    expect(screen.getByText(/100/i))
    await userEvent.type(labelInputfield, `200{enter}`)
    expect(screen.getByText(/200/i))
    await userEvent.click(screen.getByRole('button', { name: /delete 100/i }))
    expect(screen.queryByText(/100/i)).not.toBeInTheDocument()
  })

  test('Submits once 3 labels are provided', async () => {
    render(<PaletteNew close={mockClose} />)
    const labelInputfield = screen.getByRole('textbox', { name: /palette shades/i })
    await userEvent.type(labelInputfield, `{enter}`)
    await userEvent.type(labelInputfield, `     `)
    userEvent.click(screen.getByRole('button', { name: /add new label/i }))
    await userEvent.type(labelInputfield, `1{enter}`)
    userEvent.click(screen.getByRole('button', { name: /submit palette details/i }))
    expect(labelInputfield).toHaveFocus()
    await userEvent.type(labelInputfield, `2{enter}`)
    await userEvent.type(labelInputfield, `3{enter}`)
    userEvent.click(screen.getByRole('button', { name: /submit palette details/i }))
    expect(mockClose).toHaveBeenCalled()
  })

})