import { ADD_PALETTE, EDIT_PALETTE, DELETE_PALETTE, } from "./types"
import { selectPalette } from "./Selected"
import { initLabel } from "./Labels"

function addPalette(paletteLabel: string, labels: Array<string | number>): AppThunk {
  return async (dispatch, getState) => {
    dispatch(addPaletteAction(paletteLabel))
    const palette = getState().palettes
    const paletteKey = Object.keys(palette).find(key => palette[key] === paletteLabel)
    if (!paletteKey) return;
    dispatch(initLabel(paletteKey, labels))
    dispatch(selectPalette(paletteKey))
  }
}

function addPaletteAction(label: string): AppActions {
  return {
    type: ADD_PALETTE,
    label
  }
}

function editPalette(key: string, label: string,): AppActions {
  return {
    type: EDIT_PALETTE,
    key,
    label
  }
}

/**
 * Should never be directly used, Please use 'deleteSelectedPalette'
 * 
 * @param paletteKey 
 */
function deletePalette(key: string): AppActions {
  return {
    type: DELETE_PALETTE,
    key
  }
}

export { addPalette, editPalette, deletePalette }