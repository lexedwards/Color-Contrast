import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { loadState, saveState } from './generators/localStorage'

function configureStore(preloadedState: {} | undefined) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

const preloadedState = loadState()

const store = configureStore(preloadedState)
store.subscribe(() => {
  const { background, contrast, labels, palettes, selected, shades } = store.getState()
  saveState({
    background,
    contrast,
    labels,
    palettes,
    selected,
    shades
  })
})

const dispatcher = store.dispatch
export { store as default, dispatcher, configureStore }