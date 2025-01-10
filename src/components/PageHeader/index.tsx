import { PropsWithChildren } from 'react'
import { Heading } from '../Heading'

const Root = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col">{children}</div>
}

const TitleBar = ({ children }: PropsWithChildren) => {
  /**
   * Using grid template areas to give us more control over the layout of the header
   * grid-cols-page-header is defined in tailwind.config as col widths are not even. If we add more sections to the header we need to update this
   */
  return (
    <div className="grid-cols-page-header grid items-center gap-4 border-b pb-10 pt-4 [grid-template-areas:'title-area_actions']">
      {children}
    </div>
  )
}

const TitleArea = ({ children }: PropsWithChildren) => {
  return (
    <div className="[grid-area: title-area] flex flex-row items-start">
      {children}
    </div>
  )
}

const Title = ({ children }: PropsWithChildren) => {
  return <Heading variant="xl">{children}</Heading>
}

const Actions = ({ children }: PropsWithChildren) => {
  return (
    <div className="[grid-area: actions] flex min-w-max flex-row items-start justify-end gap-2">
      {children}
    </div>
  )
}

const Footer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full flex-row items-center justify-start gap-3 divide-x border-b py-6">
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
