import React, { useState } from 'react'
import styles from '../styles/header.module.scss'
import { ReactComponent as InfoIcon } from '../icons/info.svg'
import { ReactComponent as DownloadArrow } from '../icons/downloadArrow.svg'
import { ReactComponent as CssShield } from '../icons/cssShield.svg'
import { ReactComponent as FigCog } from '../icons/figCog.svg'
import InfoPanel from './modals/InfoPanel'
import WcagGuidance from './modals/WcagGuidance'
import PaletteNew from './modals/PaletteNew'
import ConfigPanel from './modals/ConfigPanel'
import PaletteSelection from './PaletteSelection'
import { Button, IconButton } from './Buttons'

export default function Header() {

  const [isInfoOpen, setInfoOpen] = useState(false)
  const [isWcagOpen, setWcagOpen] = useState(false)
  const [isNewPaletteOpen, setNewPaletteOpen] = useState(false)
  const [isConfigOpen, setConfigOpen] = useState(false)

  return (
    <React.Fragment>
      <header className={styles.bodyHeader}>
        <div className={styles.bodyHeader__title}>
          <h1>Color Contrast Ratios</h1>
          <IconButton name="More Info" onClick={() => { setInfoOpen(prev => !prev) }} Icon={InfoIcon} aria-label="Show more Information" id="infoButton" />
        </div>
        <div className={styles.bodyHeader__ui}>
          <label htmlFor='paletteSelection'>Palette:</label>
          <PaletteSelection />
          <Button name="Add New Palette" onClick={() => { setNewPaletteOpen(prev => !prev) }}>New</Button>
        </div>
        <div className={styles.bodyHeader__ui}>
          <Button name="WCAG Guide" onClick={() => { setWcagOpen(prev => !prev) }}>WCAG 2.1?</Button>
          <Button>Sketch Palette <DownloadArrow /></Button>
          <Button>Copy CSS <CssShield /></Button>
          <IconButton name="Open Settings" onClick={() => { setConfigOpen(prev => !prev) }} Icon={FigCog} aria-label="Open Config Panel" id="configButton" />
        </div>
      </header>
      {
        isInfoOpen && (
          <InfoPanel close={() => setInfoOpen(prev => !prev)} />
        )
      }
      {
        isWcagOpen && (
          <WcagGuidance close={() => setWcagOpen(prev => !prev)} />
        )
      }
      {
        isNewPaletteOpen && (
          <PaletteNew close={() => setNewPaletteOpen(prev => !prev)} />
        )
      }
      {
        isConfigOpen && (
          <ConfigPanel close={() => setConfigOpen(prev => !prev)} />
        )
      }
    </React.Fragment>
  )
}
