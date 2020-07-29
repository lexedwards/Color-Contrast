import { SELECT_PALETTE, SELECT_COLOR, SELECT_OVERLAY } from "./types"
import { genContrasts, unsetContrasts } from "./Contrast";
import { deletePalette } from "./Palettes";
import { deleteAllLabels } from "./Labels";
import { deleteAllShades } from "./Shades";

function selectPalette(paletteKey: string): AppThunk {
  return async (dispatch) => {
    dispatch(selectPaletteAction(paletteKey))
    dispatch(unsetContrasts())
  }
}

function selectPaletteAction(paletteKey: string): AppActions {
  return {
    type: SELECT_PALETTE,
    paletteKey,
  }
}

function selectColor(shadeKey: string, color: ColorBlock): AppThunk {
  return async (dispatch, getState) => {
    const selectedPalette = getState().selected.paletteKey
    if (!selectedPalette) return;
    dispatch(selectColorAction(selectedPalette, shadeKey, color))
    dispatch(genContrasts())
  }
}

function selectColorAction(paletteKey: string, shadeKey: string, color: ColorBlock): AppActions {
  return {
    type: SELECT_COLOR,
    paletteKey,
    shadeKey,
    color
  }
}

function selectOverlay(overlay: OverlayOptions): AppActions {
  return {
    type: SELECT_OVERLAY,
    overlay
  }
}

/**
 * Entry point to remove a Palette, and complete garbage collection
 * 
 * @param paletteKey 
 */
function deleteSelectedPalette(): AppThunk {
  return async (dispatch, getState) => {
    const currentSelected = getState().selected.paletteKey
    if (!currentSelected) return;
    dispatch(deletePalette(currentSelected))
    dispatch(deleteAllLabels(currentSelected))
    dispatch(deleteAllShades(currentSelected))
    const availablePalettes = getState().palettes
    if (!availablePalettes) return;
    const firstAvailable = Object.keys(availablePalettes)[0]
    dispatch(selectPalette(firstAvailable))
  }
}

export { selectPalette, selectColor, selectOverlay, deleteSelectedPalette }