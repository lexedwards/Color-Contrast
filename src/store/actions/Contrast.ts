import { GEN_CONTRASTS, UNSET_CONTRASTS } from './types'

function genContrasts(): AppThunk {
  return async (dispatch, getState) => {
    const selected = getState().selected
    if (!selected.color || !selected.paletteKey) return;
    const palette = getState().shades[selected.paletteKey]
    dispatch(genContrastsAction(palette, selected.color))
  }
}

function genContrastsAction(shades: ShadesObj[], selectedColorBlock: ColorBlock): AppActions {
  return {
    type: GEN_CONTRASTS,
    shades,
    selectedColorBlock
  }
}

function unsetContrasts(): AppActions {
  return {
    type: UNSET_CONTRASTS
  }
}



export { genContrasts, unsetContrasts }