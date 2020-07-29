import convert from 'color-convert'
import { verifyLab } from './verifyColor'


// Effectively an inverse Reciprocal/Rational algorithm:

function genTextColor(lab: Lab): string {
  let newHsl: Hsl = convert.lab.hsl(lab)
  if (!verifyLab(lab)) return '#000'
  if (lab[0] >= 90) newHsl[2] = 20
  if (lab[0] >= 80 && lab[0] < 90) newHsl[2] = 15
  if (lab[0] >= 70 && lab[0] < 80) newHsl[2] = 10
  if (lab[0] >= 60 && lab[0] < 70) newHsl[2] = 5
  if (lab[0] >= 50 && lab[0] < 60) newHsl[2] = 0
  if (lab[0] >= 40 && lab[0] < 50) newHsl[2] = 100
  if (lab[0] >= 30 && lab[0] < 40) newHsl[2] = 90
  if (lab[0] >= 20 && lab[0] < 30) newHsl[2] = 85
  if (lab[0] >= 10 && lab[0] < 20) newHsl[2] = 80
  if (lab[0] < 10) newHsl[2] = 75

  const hex = convert.hsl.hex(newHsl)
  return `#${hex}`
}

export { genTextColor }