import React, { ComponentType } from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '../store'

interface CustomRenderOptions extends RenderOptions {
  initState?: { [key: string]: any }
  store?: AppStore
}

function render(
  ui: React.ReactElement,
  options?: CustomRenderOptions) {

  const initState = options?.initState || {}
  const store = options?.store || configureStore(initState)

  store.dispatch = jest.fn(store.dispatch);

  function Wrapper({ children }: { children: React.ReactChildren }): React.ReactElement {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper as ComponentType, ...options }),
    store
  }
}

export { render }