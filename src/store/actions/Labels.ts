import { INIT_LABELS, ADD_LABEL, EDIT_LABEL, DELETE_LABEL, DELETE_ALL_LABELS } from './types'

function initLabel(paletteKey: string, labels: Array<string | number>): AppActions {
  return {
    type: INIT_LABELS,
    paletteKey,
    labels
  }
}

function addLabel(paletteKey: string, label: string | number): AppActions {
  return {
    type: ADD_LABEL,
    paletteKey,
    label
  }
}

function editLabel(paletteKey: string, prevLabel: string | number, newLabel: string | number): AppActions {
  return {
    type: EDIT_LABEL,
    paletteKey,
    prevLabel,
    newLabel
  }
}

function deleteLabel(paletteKey: string, label: string | number): AppActions {
  return {
    type: DELETE_LABEL,
    paletteKey,
    label
  }
}

/**
 * Should never be directly used, Please use 'deleteSelectedPalette'
 * 
 * @param paletteKey 
 */

function deleteAllLabels(paletteKey: string): AppActions {
  return {
    type: DELETE_ALL_LABELS,
    paletteKey
  }
}

export { initLabel, addLabel, editLabel, deleteLabel, deleteAllLabels }