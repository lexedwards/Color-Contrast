import React from 'react'
import { render } from '../tests/renderWithStore'
import { screen } from '@testing-library/react'
import App from '../App'

describe('It successfully renders the app', () => {
  test('It renders', () => {
    render(<App />)
    expect(screen.getByRole('banner'))
    expect(screen.getByRole('main'))
  })
})