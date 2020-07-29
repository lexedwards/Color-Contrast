import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPalette } from '../store/actions/Selected'

function PaletteSelection() {

  const currentKeySelector = (state: RootState) => state.selected.paletteKey
  const currentPaletteKey = useSelector(currentKeySelector)

  const labelSelector = (state: RootState) => state.palettes
  const palettes = useSelector(labelSelector)

  const dispatch = useDispatch()
  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectPalette(evt.target.value))
  }

  return (
    <select className={`select`} name="paletteSelection" id="paletteSelection" onChange={handleChange} value={currentPaletteKey || 'Select Palette'}>
      {!currentPaletteKey && <option disabled>Select Palette</option>}
      {
        Object.keys(palettes).map((paletteKey, i) =>
          <option key={i} value={paletteKey}>{palettes[paletteKey]}</option>
        )
      }
    </select>
  )
}

export { PaletteSelection as default }