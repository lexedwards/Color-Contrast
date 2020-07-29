function verifyHex(input: string): Boolean {
  const isHexcode = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return isHexcode.test(input)
}

function verifyRgb(input: Rgb): Boolean {
  return (input[0] >= 0)
    && (input[0] <= 255)
    && (input[1] >= 0)
    && (input[1] <= 255)
    && (input[2] >= 0)
    && (input[2] <= 255)
}

function verifyHsl(input: Hsl): Boolean {
  return (input[0] >= 0)
    && (input[0] <= 360)
    && (input[1] >= 0)
    && (input[1] <= 100)
    && (input[2] >= 0)
    && (input[2] <= 100)
}

function verifyLab(input: Lab): Boolean {
  return (input[0] >= 0)
    && (input[0] <= 100)
    && (input[1] >= -128)
    && (input[1] <= 128)
    && (input[2] >= -128)
    && (input[2] <= 128)
}


export { verifyHex, verifyHsl, verifyRgb, verifyLab }