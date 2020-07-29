import { EDIT_BACKGROUND } from './types'

function editBackground(hex: Hex): AppActions {
  return {
    type: EDIT_BACKGROUND,
    hex
  }
}

export { editBackground }