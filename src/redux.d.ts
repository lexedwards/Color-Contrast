type BackgroundState = string

enum OverlayOptions {
  hex = 'hex',
  hsl = 'hsl',
  rgb = 'rgb',
  lab = 'lab',
  wcag = 'wcag',
}

interface SelectedState {
  paletteKey?: string
  shadeKey?: string
  color?: ColorBlock
  overlay: OverlayOptions
}

interface LabelsState {
  [paletteKey: string]: Array<string | number>
}

interface ContrastsState {
  [hexKey: string]: number
}

interface PalettesState {
  [paletteKey: string]: string
}

interface ShadesState {
  [paletteKey: string]: ShadesObj[]
}

interface ShadesObj {
  shadeKey: string
  shadeLabel: string
  Colors: ColorBlock[]
}

interface InitStoreState {
  background: BackgroundState
  contrasts: ContrastState
  labels: LabelsState
  palettes: PalettesState
  selected: SelectedState
  shades: ShadesState
}

type RootState = ReturnType<typeof import('./store/reducers').default>

type AppStore = typeof import('./store').default

type AppDispatch = typeof import('./store').dispatcher

type AppThunk = import('redux-thunk').ThunkAction<void, RootState, unknown, import('redux').Action<string>>

/**
 * PALETTE ACTIONS
 */

interface AddPaletteAction {
  type: typeof import('./store/actions/types').ADD_PALETTE
  label: string
}

interface EditPaletteAction {
  type: typeof import('./store/actions/types').EDIT_PALETTE
  key: string
  label: string
}

interface DeletePaletteAction {
  type: typeof import('./store/actions/types').DELETE_PALETTE
  key: string
}

type PaleteActionTypes =
  | AddPaletteAction
  | EditPaletteAction
  | DeletePaletteAction

/**
 * SHADE ACTIONS
 */

interface AddShadesAction {
  type: typeof import('./store/actions/types').ADD_SHADES
  paletteKey: string
  shadeLabel: string
  hex: Hex
  paletteLabels: Array<string | number>
}

interface EditShadesAction {
  type: typeof import('./store/actions/types').EDIT_SHADES
  paletteKey: string
  shadeKey: string
  newShadesLabel: string
  color: ColorBlock,
  newColor: ColorBlock
}

interface DeleteShadesAction {
  type: typeof import('./store/actions/types').DELETE_SHADES
  paletteKey: string
  shadeKey: string
}

interface DeleteAllShadesAction {
  type: typeof import('./store/actions/types').DELETE_ALL_SHADES
  paletteKey: string
}

type ShadesActionTypes =
  | AddShadesAction
  | EditShadesAction
  | DeleteShadesAction
  | DeleteAllShadesAction

/**
 * BACKGROUND ACTIONS
 */

interface EditBackgroundAction {
  type: typeof import('./store/actions/types').EDIT_BACKGROUND,
  hex: Hex
}

type BackgroundActionTypes =
  | EditBackgroundAction

/**
 * LABEL ACTIONS
 */

interface InitLabelsAction {
  type: typeof import('./store/actions/types').INIT_LABELS
  paletteKey: string
  labels: Array<string | number>
}

interface AddLabelAction {
  type: typeof import('./store/actions/types').ADD_LABEL
  paletteKey: string
  label: string | number
}

interface EditLabelAction {
  type: typeof import('./store/actions/types').EDIT_LABEL
  paletteKey: string
  prevLabel: string | number
  newLabel: string | number
}

interface DeleteLabelAction {
  type: typeof import('./store/actions/types').DELETE_LABEL
  paletteKey: string
  label: string | number
}

interface DeleteAllLabelsAction {
  type: typeof import('./store/actions/types').DELETE_ALL_LABELS
  paletteKey: string
}

type LabelActionTypes =
  | InitLabelsAction
  | AddLabelAction
  | EditLabelAction
  | DeleteLabelAction
  | DeleteAllLabelsAction

/**
 * SELECT ACTIONS
 */

interface SelectPaletteAction {
  type: typeof import('./store/actions/types').SELECT_PALETTE
  paletteKey: string
}

interface SelectColorAction {
  type: typeof import('./store/actions/types').SELECT_COLOR
  paletteKey: string
  shadeKey: string
  color: ColorBlock
}

interface SelectOverlayAction {
  type: typeof import('./store/actions/types').SELECT_OVERLAY
  overlay: OverlayOptions
}

type SelectActionTypes =
  | SelectPaletteAction
  | SelectColorAction
  | SelectOverlayAction

/**
 * CONTRAST ACTIONS
 */

interface GenContrastsAction {
  type: typeof import('./store/actions/types').GEN_CONTRASTS
  shades: ShadesObj[],
  selectedColorBlock: ColorBlock
}

interface UnsetContrastsAction {
  type: typeof import('./store/actions/types').UNSET_CONTRASTS
}

type ContrastActionTypes =
  | GenContrastsAction
  | UnsetContrastsAction

type AppActions =
  | ShadesActionTypes
  | PaleteActionTypes
  | BackgroundActionTypes
  | LabelActionTypes
  | SelectActionTypes
  | ContrastActionTypes