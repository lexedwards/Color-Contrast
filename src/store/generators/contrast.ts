import { rgb } from 'wcag-contrast'

function genContrastValues(palette: ShadesObj[], selectedBlock: ColorBlock): ContrastsState {
  const contrast: ContrastsState = {}
  palette.forEach(({ Colors }) => {
    Colors.forEach(colorBlock => {
      contrast[colorBlock.hex] = Math.round(rgb(colorBlock.rgb, selectedBlock.rgb) * 100) / 100
    })
  })
  return contrast
}

export { genContrastValues as default }