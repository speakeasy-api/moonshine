declare module '*.module.css'

declare module '*.svg' {
  import React from 'react'
  const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVGComponent
}

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void
  }
}

export {}
