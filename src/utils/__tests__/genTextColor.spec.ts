import { genTextColor } from '../genTextColor'

describe('Computes text color based on Lab and Hsl inputs', () => {

  test('Returns a Hex string', () => {
    const gen = genTextColor([100, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Falls back to Black', () => {
    const gen = genTextColor([999, 999, 999])
    expect(gen).toEqual('#000')
  })

  test('Returns against L = 90', () => {
    const gen = genTextColor([90, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 80', () => {
    const gen = genTextColor([80, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 70', () => {
    const gen = genTextColor([70, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 60', () => {
    const gen = genTextColor([60, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 50', () => {
    const gen = genTextColor([50, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 40', () => {
    const gen = genTextColor([40, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 30', () => {
    const gen = genTextColor([30, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 20', () => {
    const gen = genTextColor([20, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 10', () => {
    const gen = genTextColor([10, 0, 0])
    expect(typeof gen).toBe('string')
  })

  test('Returns against L = 0', () => {
    const gen = genTextColor([0, 0, 0])
    expect(typeof gen).toBe('string')
  })

})