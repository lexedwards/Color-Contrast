import nanoid from 'nanoid'
import { defaultStore } from '.';
import { ADD_PALETTE, EDIT_PALETTE, DELETE_PALETTE } from '../actions/types';


const palettesReducer = (state: PalettesState = defaultStore.palettes, action: AppActions): PalettesState => {
  switch (action.type) {
    case ADD_PALETTE:
      const addUUID = nanoid()
      return {
        ...state,
        [addUUID]: action.label.trim()
      }
    case EDIT_PALETTE:
      return {
        ...state,
        [action.key]: action.label.trim()
      }
    case DELETE_PALETTE:
      const deletedState = { ...state }
      delete deletedState[action.key]
      return deletedState
    default:
      return state
  }
}

export { palettesReducer }