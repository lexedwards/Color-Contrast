import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ShadeHeader from './ShadeHeaders'
import ShadeRows from './ShadeRows'

import styles from '../../styles/palette.module.scss'
import ShadesEdit from './ShadesEdit'
import { IconButton } from '../Buttons'
import { ReactComponent as AddNew } from '../../icons/addNew.svg'
import ShadesNew from '../modals/ShadesNew'
import OverlaySelection from '../OverlaySelection'

export default function Palette() {

  const [isNewSOpen, setNewSOpen] = useState(false)

  const paletteParent = useRef<HTMLDivElement>(null)

  const selectedLabelSelector = (state: RootState) => state.selected
  const currentlySelected = useSelector(selectedLabelSelector)

  const paletteSelector = (state: RootState) => state.shades[currentlySelected.paletteKey as string]
  const currentPalette = useSelector(paletteSelector)

  const currentBackgroundSelector = (state: RootState) => state.background
  const currentBackground = useSelector(currentBackgroundSelector)

  const getLabelsLengthSelector = (state: RootState) => state.labels[currentlySelected.paletteKey as string]
  const labels = useSelector(getLabelsLengthSelector)
  const labelsLength = labels ? labels.length : 1

  useEffect(() => {
    paletteParent.current?.style.setProperty('--gtc', labelsLength.toString())
  }, [labelsLength])

  return (
    <React.Fragment>
      <main className={styles.mainApp} style={{ backgroundColor: currentBackground }}>
        <div className={styles.palettePreview}>
          <div className={styles.paletteGrid} ref={paletteParent}>
            <ShadeHeader />
            <ShadeRows />
          </div>
          <div className={styles.palettePreview__options}>
            {
              (currentPalette && currentPalette.length > 0) && <OverlaySelection />
            }
            {
              currentlySelected.paletteKey && (<IconButton
                onClick={() => { setNewSOpen(prev => !prev) }}
                Icon={AddNew}
                id="CreateShadesButton"
                aria-label="Create a new Color Set"
              />)
            }
          </div>
        </div>
        {
          currentlySelected.shadeKey && currentlySelected.color && <ShadesEdit />
        }
      </main>
      {
        isNewSOpen && (
          <ShadesNew close={() => setNewSOpen(prev => !prev)} />
        )
      }
    </React.Fragment>
  )
}
