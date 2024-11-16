declare module '*.module.css'

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void
  }
}

export {}
