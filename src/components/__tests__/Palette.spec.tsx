import React from 'react'
import { render } from '../../tests/renderWithStore'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Palette from '../palette'
import { genShades } from '../../store/generators/genShades'
import { genEvenShades } from '../../store/generators/genEvenShades'

describe('', () => {

  test('It Renders without State data', () => {
    render(<Palette />)
    expect(screen.getByRole('main'))
  })

  const mockState: RootState = {
    background: '#fff',
    contrast: {},
    labels: { 'test-uuid': ['one', 'two', 'three'] },
    palettes: { 'test-uuid': 'Example' },
    selected: {
      overlay: 'hex' as OverlayOptions,
      paletteKey: 'test-uuid',
    },
    shades: {
      'test-uuid': [
        {
          Colors: genShades('#fff', genEvenShades([1, 2, 3])),
          shadeKey: 'test-shade-uuid',
          shadeLabel: 'Neutral'
        },
        {
          Colors: genShades('#f00', genEvenShades([1, 2, 3])),
          shadeKey: 'test-shade-uuid-two',
          shadeLabel: 'Red'
        }
      ]
    }
  }

  test('It renders with State data', () => {
    render(<Palette />, { initState: mockState })
    expect(screen.getAllByRole('radio')).toHaveLength(6)
    expect(screen.getByRole('combobox'))
    expect(screen.getByRole('button', { name: /create/i }))
  })

  test('It opens a window to add a new set', () => {
    render(<Palette />, { initState: mockState })
    expect(screen.getByRole('button', { name: /create/i }))
    userEvent.click(screen.getByRole('button', { name: /create/i }))
    expect(screen.getByRole('heading')).toHaveTextContent(/add new shades/i)
    userEvent.click(document.body)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  test('It add a new set', async () => {
    render(<Palette />, { initState: mockState })
    userEvent.click(screen.getByRole('button', { name: /create/i }))
    await userEvent.type(screen.getByRole('textbox', { name: /label/i }), 'Blue')
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveValue('Blue')
    await userEvent.type(screen.getByRole('textbox', { name: /color/i }), '#00F')
    expect(screen.getByRole('textbox', { name: /color/i })).toHaveValue('#00F')
    act(() => userEvent.click(screen.getByRole('button', { name: /add/i })))
  })

  test('It can select a new Color and open the editor', () => {
    render(<Palette />, { initState: mockState })
    expect(screen.getAllByRole('radio'))
    userEvent.click(screen.getAllByRole('radio')[0])
    expect(screen.getAllByRole('heading', { name: /color editor/i }))
  })

  test('It can delete the selected color\'s set', () => {
    render(<Palette />, { initState: mockState })
    expect(screen.getAllByRole('radio'))
    userEvent.click(screen.getAllByRole('radio')[4])
    userEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(screen.queryByText(/red/i)).not.toBeInTheDocument()
  })

  test('It can Edit and Reset the selected Color', async () => {
    render(<Palette />, { initState: mockState })
    userEvent.click(screen.getAllByRole('radio')[0])
    const editLabel = screen.getByRole('textbox', { name: /edit label/i })
    await userEvent.type(editLabel, 'Grey')
    expect(screen.getByText(/grey/i))
    userEvent.click(screen.getByRole('button', { name: /reset/i }))
    expect(screen.queryByText(/grey/i)).not.toBeInTheDocument()
  })

  test('It can Edit and Save the Selected Color\'s label', async () => {
    render(<Palette />, { initState: mockState })
    userEvent.click(screen.getAllByRole('radio')[0])
    const editLabel = screen.getByRole('textbox', { name: /edit label/i })
    await userEvent.type(editLabel, 'Grey')
    const submit = screen.getByRole('button', { name: /save/i })
    userEvent.click(submit)
  })

  test('Use buttons to increment and decrement values', () => {
    render(<Palette />, { initState: mockState })
    userEvent.click(screen.getAllByRole('radio')[0])
    userEvent.click(screen.getByRole('button', { name: /increment hue/i }))
    userEvent.click(screen.getByRole('button', { name: /decrement hue/i }))
    userEvent.click(screen.getByRole('button', { name: /increment saturation/i }))
    userEvent.click(screen.getByRole('button', { name: /decrement saturation/i }))
    userEvent.click(screen.getByRole('button', { name: /increment lightness/i }))
    userEvent.click(screen.getByRole('button', { name: /decrement lightness/i }))
  })

  test('Use Input to set Values and submit', async () => {
    render(<Palette />, { initState: mockState })
    userEvent.click(screen.getAllByRole('radio')[0])
    const hueEditor = screen.getByRole('spinbutton', { name: /hue/i })
    await userEvent.type(hueEditor, '0')
    expect(hueEditor).toHaveValue(0)
    userEvent.click(screen.getByRole('button', { name: /decrement hue/i }))
    expect(hueEditor).toHaveValue(0)
    await userEvent.type(hueEditor, '360')
    userEvent.click(screen.getByRole('button', { name: /increment hue/i }))
    expect(hueEditor).toHaveValue(360)
    userEvent.click(screen.getByRole('button', { name: /save/i }))
  })

  test('It can select a Color and change the Overlay', () => {
    render(<Palette />, { initState: mockState })
    expect(screen.getAllByRole('radio'))
    userEvent.click(screen.getAllByRole('radio')[0])
    userEvent.selectOptions(screen.getByRole('combobox'), 'wcag')
  })

})