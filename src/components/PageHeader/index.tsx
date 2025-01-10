import { PropsWithChildren } from 'react'
import { Heading } from '../Heading'

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>
}

const TitleBar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 border-b pb-10 pt-4">
      {children}
    </div>
  )
}
TitleBar.displayName = 'PageHeader.TitleBar'

const TitleArea: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="order-1 flex flex-row items-start">{children}</div>
}
TitleArea.displayName = 'PageHeader.TitleArea'

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return <Heading variant="xl">{children}</Heading>
}
Title.displayName = 'PageHeader.Title'

const Actions: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="order-2 flex min-w-max flex-row items-start justify-end gap-2">
      {children}
    </div>
  )
}
Actions.displayName = 'PageHeader.Actions'

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="order-2 flex w-full flex-row items-center justify-start gap-3 divide-x border-b py-6">
      {children}
    </div>
  )
}
Footer.displayName = 'PageHeader.Footer'

const FooterItem: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-row items-center pl-6 first:pl-0">{children}</div>
  )
}
FooterItem.displayName = 'PageHeader.FooterItem'

export const PageHeader = Object.assign(Root, {
  TitleBar,
  TitleArea,
  Title,
  Actions,
  Footer,
  FooterItem,
})

PageHeader.displayName = 'PageHeader'
