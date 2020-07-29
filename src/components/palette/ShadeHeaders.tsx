import React from 'react'
import styles from '../../styles/palette.module.scss'
import { useSelector } from 'react-redux'

export default function ShadeHeader() {

  const currentKeySelector = (state: RootState) => state.selected.paletteKey
  const currentPaletteKey = useSelector(currentKeySelector)

  const headersSelector = (state: RootState) => state.labels[currentPaletteKey || '']
  const shadeHeaders = useSelector(headersSelector)

  return (
    <React.Fragment>
      <div />
      {
        shadeHeaders && shadeHeaders.map((label, i) => (
          <div key={i} className={styles.paletteGrid_Header}>
            {label}
          </div>
        ))
      }
      {
        !currentPaletteKey && <div> Please create a new Palette</div>
      }
    </React.Fragment>
  )
}
