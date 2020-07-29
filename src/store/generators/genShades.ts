import convert from 'color-convert'
import { genColorBlock } from './genColorBlock'

const genShades = (color: Hex | Rgb | Hsl | Lab, shadeValues: number[], typeOfColor: 'hex' | 'rgb' | 'hsl' | 'lab' = 'hex') => {
  const Shades: ColorBlock[] = []

  shadeValues.forEach((lightness) => {
    let uniform: Hsl;
    switch (typeOfColor) {
      case 'rgb':
        uniform = convert.rgb.hsl(color as Rgb)
        break;
      case 'hsl':
        uniform = color as Hsl
        break;
      case 'lab':
        uniform = convert.lab.hsl(color as Lab)
        break;
      default:
        uniform = convert.hex.hsl(color as Hex)
    }
    uniform[2] = lightness
    Shades.push(genColorBlock.fromHsl(uniform))
  })

  return Shades
}

export { genShades }