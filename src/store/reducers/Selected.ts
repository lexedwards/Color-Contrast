import { SELECT_PALETTE, SELECT_COLOR, SELECT_OVERLAY } from "../actions/types";
import { defaultStore } from ".";

const selectedReducer = (state: SelectedState = defaultStore.selected, action: AppActions): SelectedState => {
  switch (action.type) {
    case SELECT_PALETTE:
      return {
        overlay: 'hex' as OverlayOptions,
        paletteKey: action.paletteKey
      }
    case SELECT_COLOR:
      return {
        ...state,
        paletteKey: action.paletteKey,
        shadeKey: action.shadeKey,
        color: action.color
      }
    case SELECT_OVERLAY:
      return {
        ...state,
        overlay: action.overlay
      }
    default:
      return state
  }
}

export { selectedReducer }