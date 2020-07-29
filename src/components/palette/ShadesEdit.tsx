import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../styles/shadesEditor.module.scss'
import inputStyles from '../../styles/inputs.module.scss'
import { genColorBlock } from '../../store/generators/genColorBlock'
import { genTextColor } from '../../utils/genTextColor'
import { Button, IconButton } from '../Buttons'
import { editShades, deleteShade } from '../../store/actions/Shades'
import { ReactComponent as ArrowIcon } from '../../icons/arrowSingle.svg'

export default function ShadesEdit() {
  const dispatch = useDispatch()

  const currentSelector = (state: RootState) => state.selected
  const current = useSelector(currentSelector)

  const [newHsl, setNewHsl] = useState<Hsl>(current.color!.hsl)
  const newColorBlock = genColorBlock.fromHsl(newHsl)

  const currentPaletteSelector = (state: RootState) => state.shades[current.paletteKey!]
  const currentPalette = useSelector(currentPaletteSelector)
  const currentShade = currentPalette.find(obj => obj.shadeKey === current.shadeKey)

  const [newLabel, setNewLabel] = useState<string>(currentShade?.shadeLabel as string)

  const currentShadeIndex: number = currentPalette.findIndex(obj => obj.shadeKey === current.shadeKey)
  const currentHueIndex: number = currentShade?.Colors.findIndex(color => color.hsl === current.color!.hsl)!

  const currentLabelSelector = (state: RootState) => state.labels[current.paletteKey!][currentHueIndex]
  const currentLabel = useSelector(currentLabelSelector)

  const hueArray = () => currentShade?.Colors.map((color, i) => {
    if (i === currentHueIndex) return newColorBlock
    return color
  })
  const shadeArray = () => currentPalette.map((shade, i) => {
    if (i === currentShadeIndex) return newColorBlock
    return shade.Colors[currentHueIndex]
  })

  const handleDelete = () => {
    dispatch(deleteShade(current.paletteKey!, current.shadeKey!))
  }

  const handleReset = useCallback(() => {
    setNewHsl(() => current.color!.hsl)
    setNewLabel(() => currentShade?.shadeLabel as string)
  }, [current.color, currentShade])

  const handleSubmit = () => {
    dispatch(editShades(newLabel, newColorBlock))
    setNewHsl(() => current.color!.hsl)
    setNewLabel(() => currentShade?.shadeLabel as string)
  }

  const handleLabelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setNewLabel(() => value)
  }

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setNewHsl(prev => {
      const next: Hsl = [...prev]
      next[Number(name)] = Number(value)
      return next
    })
  }

  const incrementValue = (index: number, min: number, max: number) => {
    setNewHsl(prev => {
      const next: Hsl = [...prev]
      if (next[index] >= max) return next
      next[index]++
      return next
    })
  }

  const decrementValue = (index: number, min: number, max: number) => {
    setNewHsl(prev => {
      const next: Hsl = [...prev]
      if (next[index] <= min) return next
      next[index]--
      return next
    })
  }

  useEffect(() => {
    setNewHsl(() => current.color!.hsl)
    setNewLabel(() => currentShade?.shadeLabel as string)
  }, [current.color, currentShade])

  const firstInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstInput.current?.focus()
  }, [])

  return (
    <div className={styles.editor}>
      <h2>Color Editor</h2>
      <label htmlFor="labelInput">Edit Label</label>
      <input className={inputStyles.input__text} type="text" id="labelInput" value={newLabel} onChange={handleLabelChange} ref={firstInput} />
      <div className={styles.editor__row}>

        <label htmlFor="hueInput">Hue °</label>
        <div className={inputStyles.input__number}>
          <input id="hueInput" type="number" name="0" min={0} max={360} onChange={handleValueChange} value={newHsl[0]} />
          <div className={inputStyles.input__buttons}>
            <IconButton
              aria-label="Increment Hue"
              onMouseDown={() => incrementValue(0, 0, 360)}
              Icon={ArrowIcon} />
            <IconButton
              aria-label="Decrement Hue"
              onMouseDown={() => decrementValue(0, 0, 360)}
              Icon={ArrowIcon} className={inputStyles.input__buttons__flipSVG} />
          </div>
        </div>

        <label htmlFor="satInput">Saturation %</label>
        <div className={inputStyles.input__number}>
          <input id="satInput" type="number" name="1" min={0} max={100} onChange={handleValueChange} value={newHsl[1]} />
          <div className={inputStyles.input__buttons}>
            <IconButton
              aria-label="Increment Saturation"
              onMouseDown={() => incrementValue(1, 0, 100)}
              Icon={ArrowIcon} />
            <IconButton
              aria-label="Decrement Saturation"
              onMouseDown={() => decrementValue(1, 0, 100)}
              Icon={ArrowIcon} className={inputStyles.input__buttons__flipSVG} />
          </div>
        </div>

        <label htmlFor="lightInput">Lightness %</label>
        <div className={inputStyles.input__number}>
          <input id="lightInput" type="number" name="2" min={0} max={100} onChange={handleValueChange} value={newHsl[2]} />
          <div className={inputStyles.input__buttons}>
            <IconButton
              aria-label="Increment Lightness"
              onMouseDown={() => incrementValue(2, 0, 100)}
              Icon={ArrowIcon} />
            <IconButton
              aria-label="Decrement Lightness"
              onMouseDown={() => decrementValue(2, 0, 100)}
              Icon={ArrowIcon} className={inputStyles.input__buttons__flipSVG} />
          </div>
        </div>

      </div>
      <p>{currentShade?.shadeLabel === newLabel ? currentShade?.shadeLabel : `${currentShade?.shadeLabel} / ${newLabel}`}</p>
      <div className={styles.shadesArray}>
        {
          hueArray()?.map((color, i) => {
            if (!color) return <p key="error!">Please Select a color</p>;
            return (
              <div className={styles.shadesArray__block} key={i} style={{
                backgroundColor: `#${color.hex}`,
                color: genTextColor([...color.lab])
              }}>
                <p>{color.lab[0]}</p>
              </div>
            )
          })
        }
      </div>
      <p>{currentLabel}</p>
      <div className={styles.shadesArray}>
        {
          shadeArray().map((color, i) => {
            if (!color) return <p key={'error'}>Please Select a color</p>;
            return (
              <div className={styles.shadesArray__block} key={i} style={{
                backgroundColor: `#${color.hex}`,
                color: genTextColor([...color.lab])
              }}>
                <p>{color.lab[0]}</p>
              </div>
            )
          })
        }
      </div>
      <div className={styles.editor__row}>
        <Button className={styles.button__danger} onClick={handleDelete}>Delete Set</Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>

    </div>
  )
}
