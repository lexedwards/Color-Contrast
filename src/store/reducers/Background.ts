import { EDIT_BACKGROUND } from "../actions/types"
import { defaultStore } from "."

const backgroundReducer = (state: BackgroundState = defaultStore.background, action: AppActions): BackgroundState => {
  switch (action.type) {
    case EDIT_BACKGROUND:
      return action.hex
    default:
      return state
  }
}

export { backgroundReducer }