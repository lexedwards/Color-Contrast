import React from 'react'
import { render, screen } from '@testing-library/react'
import InfoPanel from '../InfoPanel'
import userEvent from '@testing-library/user-event'

describe('Info Panel', () => {

  const mockClose = jest.fn()

  test('It Renders and closes correctly', () => {
    render(<InfoPanel close={mockClose} />)
    expect(screen.getAllByRole('heading')).toHaveLength(4)
    userEvent.click(screen.getByRole('heading', { name: /color contrast/i }))
    expect(mockClose).not.toHaveBeenCalled()
    userEvent.click(document.body)
    expect(mockClose).toHaveBeenCalled()
  })

})