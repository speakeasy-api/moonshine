import React from 'react'

interface BoxProps {
  children: React.ReactNode
}

export function Box({ children }: BoxProps) {
  return <div style={{ border: '1px solid red' }}>{children}</div>
}
