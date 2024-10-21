import React from 'react'
import styles from './index.module.css'
interface BoxProps {
  children: React.ReactNode
}

export function Box({ children }: BoxProps) {
  return <div className={styles.box}>{children}</div>
}
