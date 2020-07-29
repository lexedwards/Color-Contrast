import React from 'react'
import styles from '../../styles/palette.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectColor } from '../../store/actions/Selected'
import { genTextColor } from '../../utils/genTextColor'

export default function Shade({ colorBlock, shadeKey }: { colorBlock: ColorBlock, shadeKey: string }) {

  const textColor = genTextColor([...colorBlock.lab])

  const contrastSelector = (state: RootState) => state.contrast[colorBlock.hex]
  const contrast = useSelector(contrastSelector)

  const selectedOverlaySelector = (state: RootState) => state.selected.overlay
  const selectedOverlay = useSelector(selectedOverlaySelector)

  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(selectColor(shadeKey, colorBlock))
  }

  return (
    <div className={styles.paletteGrid_shades__block}
      style={{
        backgroundColor: `#${colorBlock.hex}`,
        color: textColor,
      }}>
      <input type="radio" name="ColorSelect" value={colorBlock.hex} id={`${shadeKey}-${colorBlock.hex}`} onChange={handleChange} />
      <label htmlFor={`${shadeKey}-${colorBlock.hex}`}><p>
        {selectedOverlay === 'wcag' ? contrast : { ...colorBlock }[selectedOverlay].toString()}
      </p></label>
    </div>
  )
}
