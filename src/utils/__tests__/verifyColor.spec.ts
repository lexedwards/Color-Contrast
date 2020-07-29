import { verifyHex, verifyRgb, verifyHsl, verifyLab, } from '../verifyColor'

describe('Checks for valid Hex Regex', () => {

  test('Returns false without `#`', () => {
    const tester = 'FFF'
    const res = verifyHex(tester)
    expect(res).toBe(false)
  })

  test('Fails with invalid color hex', () => {
    const tester = '#GHIJKL'
    const res = verifyHex(tester)
    expect(res).toBe(false)
  })

  test('Returns true with valid 3-digit color hex', () => {
    const tester = '#fff'
    const res = verifyHex(tester)
    expect(res).toBe(true)
  })

  test('Returns true with valid 6-digit color hex', () => {
    const tester = '#ff0000'
    const res = verifyHex(tester)
    expect(res).toBe(true)
  })

})

describe('Checks for valid RGB', () => {

  test('Returns false with invalid Red range', () => {
    const res = verifyRgb([-100, 10, 50])
    expect(res).toBe(false)
    const reres = verifyRgb([300, 10, 50])
    expect(reres).toBe(false)
  })

  test('Returns false with invalid Green range', () => {
    const res = verifyRgb([100, -100, 50])
    expect(res).toBe(false)
    const reres = verifyRgb([100, 300, 50])
    expect(reres).toBe(false)
  })

  test('Returns false with invalid Blue range', () => {
    const res = verifyRgb([100, 10, -100])
    expect(res).toBe(false)
    const reres = verifyRgb([100, 10, 300])
    expect(reres).toBe(false)
  })

  test('Returns true with Valid RGB', () => {
    const res = verifyRgb([255, 255, 255])
    expect(res).toBe(true)
  })

})

describe('Checks for valid HSL', () => {

  test('Returns false with invalid Hue range', () => {
    const res = verifyHsl([-1, 10, 50])
    expect(res).toBe(false)
    const reres = verifyHsl([361, 10, 50])
    expect(reres).toBe(false)
  })

  test('Returns false with invalid Saturation range', () => {
    const res = verifyHsl([0, -1, 50])
    expect(res).toBe(false)
    const reres = verifyHsl([0, 101, 50])
    expect(reres).toBe(false)
  })

  test('Returns false with invalid Lightness range', () => {
    const res = verifyHsl([0, 10, -1])
    expect(res).toBe(false)
    const reres = verifyHsl([0, 10, 101])
    expect(reres).toBe(false)
  })

  test('Returns true with Valid Hsl', () => {
    const res = verifyHsl([0, 50, 50])
    expect(res).toBe(true)
  })

})

describe('Checks for valid LAB', () => {

  test('Returns false with invalid L range', () => {
    const res = verifyLab([-1, 50, 50])
    expect(res).toBe(false)
    const reres = verifyLab([101, 50, 50])
    expect(reres).toBe(false)
  })

  test('Returns false with invalid a range', () => {
    const res = verifyLab([50, -129, 50])
    expect(res).toBe(false)
    const reres = verifyLab([50, 129, 50])
    expect(reres).toBe(false)
  })

  test('Returns false with invalid b range', () => {
    const res = verifyLab([50, 50, -129])
    expect(res).toBe(false)
    const reres = verifyLab([50, 50, 129])
    expect(reres).toBe(false)
  })

  test('Returns true with Valid Lab', () => {
    const res = verifyLab([50, 50, 50])
    expect(res).toBe(true)
  })

})
