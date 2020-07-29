import { loadState, saveState } from '../localStorage'

describe('Loads and Saves local Storage', () => {

  const mockState = {
    success: 'Yes'
  }

  test('loads from local storage', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockImplementation(() => JSON.stringify(mockState))
    const res = loadState()
    expect(localStorage.getItem).toHaveBeenCalled()
    expect(res).toEqual(mockState)
  })

  test('Returns undefined if no store', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockImplementation(() => null)
    const res = loadState()
    expect(localStorage.getItem).toHaveBeenCalled()
    expect(res).toBeUndefined()
  })

  test('If local storage is unavailable', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockImplementation(() => new Error('Access Denied'))
    const res = loadState()
    expect(localStorage.getItem).toHaveBeenCalled()
    expect(res).toBeUndefined()
  })

  test('saves to LocalStorage', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    saveState({})
    expect(localStorage.setItem).toHaveBeenCalled()
  })


})