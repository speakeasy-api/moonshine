import { cn } from '@/lib/utils'
import React, { ReactElement, FC, PropsWithChildren, Children } from 'react'

const CardHeader: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6 pb-0 text-lg font-semibold leading-none tracking-tight">
    {children}
  </div>
)
CardHeader.displayName = 'CardHeader'

const CardContent: FC<PropsWithChildren> = ({ children }) => (
  <div className="p-6">{children}</div>
)
CardContent.displayName = 'CardContent'

const CardFooter: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center p-6 pt-0 text-sm text-muted-foreground">
    {children}
  </div>
)
CardFooter.displayName = 'CardFooter'

type CardProps = {
  children: Array<
    | ReactElement<typeof CardHeader>
    | ReactElement<typeof CardContent>
    | ReactElement<typeof CardFooter>
  >
}

type AllChildren = typeof CardHeader | typeof CardContent | typeof CardFooter

const customSort = (a: ReactElement, b: ReactElement) => {
  const order = [CardHeader, CardContent, CardFooter]
  return (
    order.indexOf(a.type as AllChildren) - order.indexOf(b.type as AllChildren)
  )
}

const Card: FC<CardProps> = ({ children }) => {
  // We will omit any invalid children if they are present
  const isValidChild = (child: ReactElement): boolean =>
    child.type === CardHeader ||
    child.type === CardContent ||
    child.type === CardFooter

  const invalidChildren = Children.toArray(children).filter(
    (child): child is ReactElement =>
      React.isValidElement(child) && !isValidChild(child)
  )

  if (invalidChildren.length > 0) {
    console.warn(
      'Card component received invalid children (will be omitted):',
      invalidChildren
    )
  }

  const filteredChildren = Children.toArray(children)
    .filter(
      (child): child is ReactElement<AllChildren> =>
        React.isValidElement(child) && isValidChild(child)
    )
    // Sort the children in the order of CardHeader, CardContent, CardFooter
    // no matter what order they are defined in code.
    .sort(customSort)

  return (
    <div
      className={cn('rounded-xl border bg-card text-card-foreground shadow')}
    >
      {filteredChildren}
    </div>
  )
}

const CardWithSubcomponents = Object.assign(Card, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
})

export default CardWithSubcomponents
