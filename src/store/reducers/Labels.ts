import { defaultStore } from ".";
import { INIT_LABELS, ADD_LABEL, EDIT_LABEL, DELETE_LABEL, DELETE_ALL_LABELS } from "../actions/types";

const labelsReducer = (state: LabelsState = defaultStore.labels, action: AppActions): LabelsState => {
  switch (action.type) {
    case INIT_LABELS:
      return {
        ...state,
        [action.paletteKey]: action.labels
      }
    case ADD_LABEL:
      const addToKey = [...state[action.paletteKey]]
      addToKey.push(action.label)
      return {
        ...state,
        [action.paletteKey]: addToKey
      }
    case EDIT_LABEL:
      const editToKey = [...state[action.paletteKey]].map(label => {
        if (label !== action.prevLabel) return label
        return action.newLabel
      })
      return {
        ...state,
        [action.paletteKey]: editToKey
      }
    case DELETE_LABEL:
      return {
        ...state,
        [action.paletteKey]: [...state[action.paletteKey]].filter(label => {
          return label !== action.label
        })
      }
    case DELETE_ALL_LABELS:
      return { ...state }
    default:
      return state
  }
}

export { labelsReducer }