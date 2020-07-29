interface ColorBlock {
  hex: Hex
  rgb: Rgb
  hsl: Hsl
  lab: Lab
}

type Hex = string

type Rgb = [number, number, number]

type Hsl = [number, number, number]

type Lab = [number, number, number]

type Color =
  | Hex | Rgb | Hsl | Lab