import React, { useRef, useEffect, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import styles from '../../styles/infoModal.module.scss'
import inputstyles from '../../styles/inputs.module.scss'
import { ReactComponent as Cog } from '../../icons/figCog.svg'
import { Button } from '../Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSelectedPalette } from '../../store/actions/Selected'
import { verifyHex } from '../../utils/verifyColor'
import { editBackground } from '../../store/actions/Background'

export default function ConfigPanel({ close }: { close: () => void }) {

  const ref = useRef(null)
  useClickOutside(ref, () => { close() })

  const startInput = useRef<HTMLInputElement>(null)
  useEffect(() => startInput?.current?.focus())

  const currentBackgroundSelector = (state: RootState) => state.background
  const currentBackground = useSelector(currentBackgroundSelector)
  const dispatch = useDispatch()

  const [previewBackground, setPreviewBackground] = useState({ current: currentBackground, error: '' })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value
    if (!verifyHex(text)) {
      setPreviewBackground(prev => {
        return {
          ...prev,
          error: 'Invalid Hex code',
          current: text
        }
      })
    } else {
      setPreviewBackground(prev => {
        return {
          ...prev,
          error: '',
          current: text
        }
      })
    }
  }

  const handleDelete = () => {
    dispatch(deleteSelectedPalette())
    close()
  }

  const submitBackground = () => {
    if (previewBackground.error) return startInput.current?.focus()
    dispatch(editBackground(previewBackground.current))
  }

  return (
    <div className={styles.infoPanel} ref={ref}>
      <Cog />
      <h2>Settings</h2>
      <label htmlFor="backgroundColor">Background</label>
      <p>{previewBackground.error && `Error: ${previewBackground.error}`}</p>
      <input className={inputstyles.input__text}
        ref={startInput} type="text" name="backgroundColor" id="backgroundColor"
        maxLength={7}
        onChange={handleChange}
        value={previewBackground.current}
      />
      <div className={styles.backgroundColorPreview}
        style={{ backgroundColor: verifyHex(previewBackground.current) ? previewBackground.current : '#fff' }}
      />
      <Button onClick={submitBackground}>Save Background</Button>
      <h3>Danger Zone</h3>
      <Button className={styles.button__danger} onClick={handleDelete}>Delete Palette</Button>
    </div>
  )
}
