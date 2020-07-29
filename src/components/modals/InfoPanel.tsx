import React, { useRef } from 'react'
import { ReactComponent as InfoIcon } from '../../icons/info.svg'
import styles from '../../styles/infoModal.module.scss'
import useClickOutside from '../../hooks/useClickOutside'

export default function InfoPanel({ close }: { close: () => void }) {

  const ref = useRef(null)
  useClickOutside(ref, () => { close() })

  return (
    <div className={`${styles.infoPanel} ${styles.wide}`} ref={ref}>
      <InfoIcon />
      <h2>Color Contrast</h2>
      <p>This site aims to align color palettes to uniform lightness
      (CIE-lab Colour Space) so both designers and developers
      need not worry about changing color schemes.
      </p>
      <h3>Editor</h3>
      <p>The Hue and Saturation changes all colours of the same tones (x-axis)
      Changing the Lightness value changes that of those in the same y-axis.
      </p>
      <h3>Usage</h3>
      <p>
        First, create a palette, and then hit the plus symbol to create a new shade from a base color.
        After that, you can select whatever color you would like as a base, and it will highlight the
        contrasting values for all other colors. The idea here is to highlight a consistent palette,
        where all in the same column, has a similar contrast value. This results in a palette
        that has interchangeable hues if that shade stays the same. I.e. red-500 ~= blue-500
      </p>
      <h3>Download</h3>
      <p>
        Copy the CSS custom properties, or download the Sketch Palette File for local development.
        CSS custom properties will have the pattern of
      </p>
      <pre>--[palette]-[label] : hsl()</pre>
      <pre>--example-light: hsl(70, 30%, 90%)</pre>
    </div>
  )
}
