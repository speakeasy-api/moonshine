declare module '*.module.css'

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void
  }
}

export {}
