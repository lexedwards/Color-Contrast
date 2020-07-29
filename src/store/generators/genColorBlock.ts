import convert from 'color-convert'

const genColorBlock = {
  fromHex(hex: Hex): ColorBlock {
    return {
      hex: convert.rgb.hex(convert.hex.rgb(hex)),
      rgb: convert.hex.rgb(hex),
      hsl: convert.hex.hsl(hex),
      lab: convert.hex.lab(hex),
    }
  },
  fromRgb(rgb: Rgb): ColorBlock {
    return {
      hex: convert.rgb.hex(rgb),
      rgb: [...rgb],
      hsl: convert.rgb.hsl(rgb),
      lab: convert.rgb.lab(rgb),
    }
  },
  fromHsl(hsl: Hsl): ColorBlock {
    return {
      hex: convert.hsl.hex(hsl),
      rgb: convert.hsl.rgb(hsl),
      hsl: [...hsl],
      lab: convert.hsl.lab(hsl),
    }
  },
  fromLab(lab: Lab): ColorBlock {
    return {
      hex: convert.lab.hex(lab),
      rgb: convert.lab.rgb(lab),
      hsl: convert.lab.hsl(lab),
      lab: [...lab],
    }
  }
}

export { genColorBlock }