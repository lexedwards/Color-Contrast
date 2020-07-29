import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import WcagGuidance from '../WcagGuidance'

describe('Wcag Guidance Info', () => {

  const mockClose = jest.fn()

  test('It renders and closes', () => {
    render(<WcagGuidance close={mockClose} />)
    expect(screen.getByRole('heading', { name: /wcag complience/i }))
    userEvent.click(screen.getByRole('heading', { name: /wcag complience/i }))
    expect(mockClose).not.toHaveBeenCalled()
    userEvent.click(document.body)
    expect(mockClose).toHaveBeenCalledTimes(1)
  })



})