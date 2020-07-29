const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState) as RootState
  } catch (err) {
    return undefined
  }
}

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    window.localStorage.setItem('state', serializedState)
  } catch (err) {

  }
}

export { loadState, saveState }