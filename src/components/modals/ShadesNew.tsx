import React, { useRef, useState, useEffect } from 'react'
import { ReactComponent as AddNew } from '../../icons/addNew.svg'
import useClickOutside from '../../hooks/useClickOutside'
import styles from '../../styles/infoModal.module.scss'
import inputstyles from '../../styles/inputs.module.scss'
import { useDispatch } from 'react-redux'
import { addShades } from '../../store/actions/Shades'
import { Button } from '../Buttons'
import { verifyHex } from '../../utils/verifyColor'

export default function ShadesNew({ close }: { close: () => void }) {
  const ref = useRef(null)
  useClickOutside(ref, () => { close() })

  const inputLabel = useRef<HTMLInputElement>(null)
  const inputColor = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()


  const [newShadeState, setNewShadeState] = useState({ label: '', hex: '', error: '' })
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setNewShadeState(prev => {
      const shade = { ...prev }
      shade[name as 'label' | 'hex'] = value
      return shade
    })
  }

  const handleSubmit = () => {
    if (!newShadeState?.label) {
      setNewShadeState(prev => {
        return {
          ...prev,
          error: 'Please add a label'
        }
      })
      return inputLabel?.current?.focus()
    }
    if (!newShadeState?.hex || !verifyHex(newShadeState?.hex)) {
      setNewShadeState(prev => {
        return {
          ...prev,
          error: 'Invalid Color Hex Code'
        }
      })
      return inputColor?.current?.focus()
    }
    dispatch(addShades(newShadeState.label, newShadeState.hex))
    setNewShadeState(() => ({ label: '', hex: '', error: '' }))
    close()
  }


  useEffect(() => {
    const ColorTextfield = inputColor.current
    const handleBlur = () => {
      if (!verifyHex(newShadeState?.hex)) {
        setNewShadeState(prev => {
          return {
            ...prev,
            error: 'Invalid Color Hex Code'
          }
        })
      } else {
        setNewShadeState(prev => {
          return {
            ...prev,
            error: ''
          }
        })
      }
    }

    ColorTextfield?.addEventListener("blur", handleBlur)

    return (() => {
      ColorTextfield?.removeEventListener('blur', handleBlur)
    })

  }, [newShadeState])

  useEffect(() => {
    inputLabel?.current?.focus()
  }, [])

  return (
    <div ref={ref} className={styles.infoPanel}>
      <AddNew />
      <h2>Add New Shades</h2>
      <p className={styles.error}>{newShadeState.error && `Error: ${newShadeState.error}`}</p>
      <label htmlFor="shadeLabel">Label</label>
      <input className={inputstyles.input__text} ref={inputLabel} type="text"
        name="label" id="shadeLabel" value={newShadeState?.label} onChange={handleChange} />
      <label htmlFor="shadeColor">Color</label>
      <input className={inputstyles.input__text} ref={inputColor} type="text"
        name="hex" id="shadeColor" value={newShadeState?.hex} onChange={handleChange} maxLength={7} />
      <div className={styles.backgroundColorPreview}
        style={{ backgroundColor: verifyHex(newShadeState.hex) ? newShadeState.hex : '#fff' }}
      />
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  )
}
