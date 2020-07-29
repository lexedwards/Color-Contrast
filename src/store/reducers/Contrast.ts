import { GEN_CONTRASTS, UNSET_CONTRASTS } from '../actions/types'
import contrastValues from '../generators/contrast'
import { defaultStore } from '.'

const contrastsReducer = (state: ContrastsState = defaultStore.contrasts, action: AppActions): ContrastsState => {
  switch (action.type) {
    case GEN_CONTRASTS:
      return contrastValues(action.shades, action.selectedColorBlock)
    case UNSET_CONTRASTS:
      return {}
    default:
      return state
  }
}

export { contrastsReducer }