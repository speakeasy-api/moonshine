import { PropsWithChildren } from 'react'
import { Heading } from '../Heading'

const Root = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col">{children}</div>
}

const TitleBar = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 border-b pb-10 pt-4">
      {children}
    </div>
  )
}

const TitleArea = ({ children }: PropsWithChildren) => {
  return <div className="order-1 flex flex-row items-start">{children}</div>
}

const Title = ({ children }: PropsWithChildren) => {
  return <Heading variant="xl">{children}</Heading>
}

const Actions = ({ children }: PropsWithChildren) => {
  return (
    <div className="order-2 flex min-w-max flex-row items-start justify-end gap-2">
      {children}
    </div>
  )
}

const Footer = ({ children }: PropsWithChildren) => {
  return (
    <div className="order-2 flex w-full flex-row items-center justify-start gap-3 divide-x border-b py-6">
      {children}
    </div>
  )
}

const FooterItem = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row items-center pl-6 first:pl-0">{children}</div>
  )
}

export const PageHeader = Object.assign(Root, {
  TitleBar,
  TitleArea,
  Title,
  Actions,
  Footer,
  FooterItem,
})
