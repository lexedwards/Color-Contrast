import React, { useRef, useState, useEffect } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import styles from '../../styles/infoModal.module.scss'
import inputstyles from '../../styles/inputs.module.scss'
import { ReactComponent as AddNew } from '../../icons/addNew.svg'
import { useDispatch } from 'react-redux'
import { addPalette } from '../../store/actions/Palettes'
import { Button } from '../Buttons'

export default function PaletteNew({ close }: { close: () => void }) {
  const ref = useRef(null)
  useClickOutside(ref, () => { close() })

  const dispatch = useDispatch()

  const [paletteLabel, setPaletteLabel] = useState('')
  const [labelsArray, setLabelsArray] = useState<(number | string)[]>([])
  const [labelsInput, setLabelsInput] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)
  const labelsRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPaletteLabel(evt.target.value)
  }

  const handleLabelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = evt.target.value
    setLabelsInput(() => val)
  }

  const handleLabelSubmit = () => {
    if (!labelsInput.trim()) return labelsRef?.current?.focus()
    setLabelsArray(state => [...state, labelsInput.trim()])
    setLabelsInput('')
  }
  const keyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      if (!labelsInput.trim()) return labelsRef?.current?.focus()
      setLabelsArray(state => [...state, labelsInput.trim()])
      setLabelsInput(() => '')
    }
  }
  const handleDel = (label: string | number) => {
    setLabelsArray(state => state.filter(stateLabel => stateLabel !== label))
  }

  const handleSubmit = () => {
    if (labelsArray.length < 3) {
      return labelsRef?.current?.focus()
    }
    dispatch(addPalette(paletteLabel, labelsArray))
    close()
  }

  return (
    <div ref={ref} className={styles.infoPanel}>
      <AddNew />
      <h2>Add New Palette</h2>
      <label htmlFor="paletteLabel">Palette Name:</label>
      <input className={inputstyles.input__text} ref={inputRef} type="text"
        name="paletteLabel" id="paletteLabel"
        onChange={handleChange} value={paletteLabel} />
      <label htmlFor="labelInput">Palette Shades</label>
      {labelsArray.map((label, i) =>
        <div key={i}>{label} <button aria-label={`delete ${label}`} onClick={() => handleDel(label)}>X</button></div>
      )}
      {
        (labelsArray.length < 3) && (<div className={styles.error}>Please use 3 or more labels</div>)
      }
      <input className={inputstyles.input__text} type="text" name="labelInput" id="labelInput"
        ref={labelsRef}
        value={labelsInput}
        placeholder="I.e. '100'"
        onChange={handleLabelChange}
        onKeyUp={keyPress}
      />
      <Button className={styles.button__margin} onClick={handleLabelSubmit}>Add New Label</Button>
      <Button aria-label="submit palette details" className={styles.button__margin} onClick={handleSubmit}>Add Palette</Button>
    </div>
  )
}
