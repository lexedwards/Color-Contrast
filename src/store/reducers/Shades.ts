import nanoid from 'nanoid'
import { defaultStore } from ".";
import { ADD_SHADES, EDIT_SHADES, DELETE_SHADES, DELETE_ALL_SHADES } from "../actions/types";
import { genShades } from '../generators/genShades';
import { genEvenShades } from '../generators/genEvenShades';

const shadesReducer = (state: ShadesState = defaultStore.shades, action: AppActions): ShadesState => {
  switch (action.type) {
    case ADD_SHADES:
      let addShades = state[action.paletteKey] ? state[action.paletteKey] : []
      addShades.push({
        shadeKey: nanoid(),
        shadeLabel: action.shadeLabel,
        Colors: genShades(action.hex, genEvenShades(action.paletteLabels)),
      })
      return {
        ...state,
        [action.paletteKey]: addShades
      }
    case EDIT_SHADES:
      return {
        ...state,
        [action.paletteKey]: [
          ...state[action.paletteKey].map(shadeObj => {
            if (shadeObj.shadeKey !== action.shadeKey) return shadeObj
            return {
              ...shadeObj,
              shadeLabel: action.newShadesLabel,
              Colors: shadeObj.Colors.map(color => {
                if (color !== action.color) return color
                return action.newColor
              })
            }
          })
        ]
      }
    case DELETE_SHADES:
      return {
        ...state,
        [action.paletteKey]: [...state[action.paletteKey]].filter(
          ({ shadeKey }) => shadeKey !== action.shadeKey
        )
      }
    case DELETE_ALL_SHADES:
      const deleteAllState = { ...state }
      delete deleteAllState[action.paletteKey]
      return deleteAllState
    default:
      return state
  }
}

export { shadesReducer }