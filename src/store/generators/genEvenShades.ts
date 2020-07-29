function genEvenShades(labels: Array<string | number>,) {
  const l = labels.length
  const m = 100 / l
  return labels.map((_, i) => {
    return 100 - (Math.floor((i * m) + (0.5 * m)))
  })
}

export { genEvenShades }