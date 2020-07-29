import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button, IconButton } from '../Buttons'
import { ReactComponent as Info } from '../../icons/info.svg'

describe('Tests the two types of Buttons', () => {

  test('It creates a button', () => {
    render(<Button>test button</Button>)
    expect(screen.getByRole('button')).toHaveTextContent(/test button/i)
  })

  test('Creates a valid button from a SVG file', () => {
    render(<IconButton Icon={Info} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })



})