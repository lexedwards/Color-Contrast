import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectOverlay } from '../store/actions/Selected'

function OverylaySelection() {
  const currentOverlaySelector = (state: RootState) => state.selected.overlay
  const currentOverlay = useSelector(currentOverlaySelector)

  const dispatch = useDispatch()

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const valueInput = evt.target.value as OverlayOptions
    dispatch(selectOverlay(valueInput))
  }

  const enumMembers = ['hex', 'rgb', 'hsl', 'lab', 'wcag']

  return (
    <div>
      <label htmlFor="overlaySelection">
        Overlay:
      </label>
      <select className={'select'} name="overlaySelection"
        aria-label='Select Meta Information to see'
        id="overlaySelection" onChange={handleChange}
        value={currentOverlay || "hex"}>
        {
          enumMembers.map((val, i) =>
            <option key={i} value={val}>
              {val}
            </option>
          )
        }
      </select>
    </div>
  )
}

export { OverylaySelection as default }