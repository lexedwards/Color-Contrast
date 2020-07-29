import React from 'react'
import Shade from './Shade'
import styles from '../../styles/palette.module.scss'
import { useSelector } from 'react-redux'

export default function ShadeRows() {

  const selectedLabel = (state: RootState) => state.selected.paletteKey
  const currentlySelected = useSelector(selectedLabel)
  const paletteSelector = (state: RootState) => state.shades[currentlySelected as string]
  const currentPalette = useSelector(paletteSelector)

  return (
    <React.Fragment>
      {currentPalette && currentPalette.map((shadesObj, i) => (
        <React.Fragment key={shadesObj.shadeKey}>
          <p className={styles.paletteGrid_shades__label}>{shadesObj.shadeLabel}</p>
          {
            shadesObj.Colors.map((colorBlock, i) => {
              return (<Shade key={i} colorBlock={colorBlock} shadeKey={shadesObj.shadeKey} />)
            })
          }
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}
