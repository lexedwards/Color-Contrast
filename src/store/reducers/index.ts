import { combineReducers } from 'redux'
import { backgroundReducer } from './Background'
import { contrastsReducer } from './Contrast'
import { labelsReducer } from './Labels'
import { palettesReducer } from './Palettes'
import { selectedReducer } from './Selected'
import { shadesReducer } from './Shades'

const defaultStore: InitStoreState = {
  background: '#FFF',
  contrasts: {},
  labels: {},
  palettes: {},
  selected: { overlay: 'hex' as OverlayOptions },
  shades: {},
}

const rootReducer = combineReducers({
  background: backgroundReducer,
  contrast: contrastsReducer,
  labels: labelsReducer,
  palettes: palettesReducer,
  selected: selectedReducer,
  shades: shadesReducer,
})

export { rootReducer as default, defaultStore }