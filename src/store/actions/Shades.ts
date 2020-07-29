import {
  ADD_SHADES,
  EDIT_SHADES,
  DELETE_SHADES,
  DELETE_ALL_SHADES,
} from './types'
import { genContrasts } from './Contrast';
import { selectPalette, selectColor } from './Selected';

function addShades(shadeLabel: string, hex: Hex): AppThunk {
  return async (dispatch, getState) => {
    const palette = getState().selected.paletteKey
    if (!palette) return;
    const labels = getState().labels[palette]
    dispatch(addShadesAction(palette, shadeLabel, hex, labels))
    dispatch(genContrasts())
  }
}

function addShadesAction(
  paletteKey: string,
  shadeLabel: string,
  hex: Hex,
  paletteLabels: Array<string | number>): AppActions {
  return {
    type: ADD_SHADES,
    paletteKey,
    shadeLabel,
    hex,
    paletteLabels
  }
}

function editShades(newShadesLabel: string, newColor: ColorBlock): AppThunk {
  return async (dispatch, getState) => {
    const { paletteKey, shadeKey, color } = getState().selected
    if (!paletteKey || !shadeKey || !color) return console.log(paletteKey, shadeKey, color, 'something missing');
    dispatch(editShadesAction(paletteKey, shadeKey, newShadesLabel, color, newColor))
    dispatch(selectColor(shadeKey, newColor))
    dispatch(genContrasts())
  }
}

function editShadesAction(paletteKey: string, shadeKey: string, newShadesLabel: string, color: ColorBlock, newColor: ColorBlock): AppActions {
  return {
    type: EDIT_SHADES,
    paletteKey,
    shadeKey,
    newShadesLabel,
    color,
    newColor
  }
}

function deleteShade(paletteKey: string, shadeKey: string): AppThunk {
  return (dispatch) => {
    dispatch(deleteShadeAction(paletteKey, shadeKey))
    dispatch(selectPalette(paletteKey))
  }
}

function deleteShadeAction(paletteKey: string, shadeKey: string): AppActions {
  return {
    type: DELETE_SHADES,
    paletteKey,
    shadeKey
  }
}


/**
 * Should never be directly used, Please use 'deleteSelectedPalette'
 * 
 * @param paletteKey 
 */
function deleteAllShades(paletteKey: string): AppActions {
  return {
    type: DELETE_ALL_SHADES,
    paletteKey
  }
}


export { addShades, editShades, deleteShade, deleteAllShades }