import React from 'react'
import styles from '../styles/buttons.module.scss'

export function Button(
  { children, className, ...rest }
    : ReactButtonI
) {
  return (
    <button {...rest} className={`${styles.button} ${className}`}>
      {children}
    </button>
  )
}

export function IconButton({ Icon, className, id, ...rest }: ReactIconButton) {
  return (
    <button className={`${styles.icon_button} ${className}`} id={id} {...rest}>
      <Icon aria-label={Icon.displayName} aria-labelledby={id} />
    </button>
  )
}