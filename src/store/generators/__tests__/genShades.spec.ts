import { genShades } from '../genShades'
import { genEvenShades } from '../genEvenShades'

describe('Takes a base color and array of numbers to produce an array of colorBlocks', () => {

  const evenShades = genEvenShades(Array.from('01234'))

  const hex: Hex = '#fff'
  const rgb: Rgb = [255, 255, 255]
  const hsl: Hsl = [0, 0, 100]
  const lab: Lab = [100, 0, -0]

  test('Creates from Hex', () => {
    const res = genShades(hex, evenShades)
    expect(res).toHaveLength(5)
  })

  test('Creates from Rgb', () => {
    const res = genShades(rgb, evenShades, 'rgb')
    expect(res).toHaveLength(5)
  })

  test('Creates from Hsl', () => {
    const res = genShades(hsl, evenShades, 'hsl')
    expect(res).toHaveLength(5)
  })

  test('Creates from Lab', () => {
    const res = genShades(lab, evenShades, 'lab')
    expect(res).toHaveLength(5)
  })

})