interface BoxProps {
  children: React.ReactNode
}

export function Box({ children }: BoxProps) {
  return <div className="border border-primary bg-card p-4">{children}</div>
}
