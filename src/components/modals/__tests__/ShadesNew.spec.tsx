import React from 'react'
import { render } from '../../../tests/renderWithStore'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ShadesNew from '../ShadesNew'

describe('New Shades Panel', () => {

  const mockClose = jest.fn()

  test('It Renders and Closes', () => {
    render(<ShadesNew close={mockClose} />)
    expect(screen.getByRole('heading')).toHaveTextContent(/add new shades/i)
    userEvent.click(screen.getByRole('heading'))
    expect(mockClose).not.toHaveBeenCalled()
    userEvent.click(document.body)
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  test('It handles input', async () => {
    render(<ShadesNew close={mockClose} />)
    const labelInput = screen.getByRole('textbox', { name: /label/i })
    await userEvent.type(labelInput, `Neutral`)
    expect(labelInput).toHaveValue('Neutral')
    const colorInput = screen.getByRole('textbox', { name: /color/i })
    await userEvent.type(colorInput, `#ccc`)
    expect(colorInput).toHaveValue('#ccc')
    act(() => userEvent.click(screen.getByRole('button')))
    expect(mockClose).toHaveBeenCalled()
  })

  test('It fails without a Label', () => {
    render(<ShadesNew close={mockClose} />)
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    act(() => userEvent.click(screen.getByRole('button')))
    expect(screen.getByText(/error/i))
  })

  test('It Fails without a valid Color', async () => {
    render(<ShadesNew close={mockClose} />)
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    const labelInput = screen.getByRole('textbox', { name: /label/i })
    await userEvent.type(labelInput, `Neutral`)
    const colorInput = screen.getByRole('textbox', { name: /color/i })
    await userEvent.type(colorInput, `#cc`)
    act(() => userEvent.click(screen.getByRole('button')))
    expect(screen.getByText(/error/i))

  })

})