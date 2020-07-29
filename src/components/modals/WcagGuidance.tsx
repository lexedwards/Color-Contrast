import React, { useRef } from 'react'
import { ReactComponent as InfoIcon } from '../../icons/info.svg'
import styles from '../../styles/infoModal.module.scss'
import useClickOutside from '../../hooks/useClickOutside'

export default function WcagGuidance({ close }: { close: () => void }) {

  const ref = useRef(null)
  useClickOutside(ref, () => { close() })

  return (
    <div className={styles.infoPanel} ref={ref}>
      <InfoIcon />
      <h2>WCAG Complience</h2>
      <p>AA complience is regarded as the benchmark for all products, AAA is the gold standard</p>
      <div className={styles.wcag_grid} >
        <div className={styles.wcag_header}>
          <h3>AA</h3>
          <h3>AAA</h3>
        </div>
        <div className={styles.wcag_rows}>
          <p className={styles.wcag_labels}>3:1</p>
          <p>Graphics, UI, Large Text</p>
        </div>
        <div className={styles.wcag_rows}>
          <p className={styles.wcag_labels}>4.5:1</p>
          <p>Regular Text</p>
          <p>Graphics, UI, Large Text</p>
        </div>
        <div className={styles.wcag_rows}>
          <p className={styles.wcag_labels}>7:1</p>
          <p></p>
          <p>Regular Text</p>
        </div>
      </div>

      <p>Large Text is defined as:<br /> Bold 14pt+ (18.5px) or Regular 18pt+(24px)</p>

    </div>
  )
}
