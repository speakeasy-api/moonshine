import React, { Children, Fragment, PropsWithChildren } from 'react'
import { Heading } from '../Heading'
import { Separator } from '../Separator'

import styles from './styles.module.css'
import { cn } from '@/lib/utils'
import useTailwindBreakpoint from '@/hooks/useTailwindBreakpoint'

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.pageHeader}>{children}</div>
}

const TitleBar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        styles.titleBar,
        'flex flex-row items-center justify-between gap-4 border-b py-10'
      )}
    >
      {children}
    </div>
  )
}
TitleBar.displayName = 'PageHeader.TitleBar'

const TitleArea: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn(styles.titleArea, 'flex flex-row items-start')}>
      {children}
    </div>
  )
}
TitleArea.displayName = 'PageHeader.TitleArea'

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return <Heading variant="xl">{children}</Heading>
}
Title.displayName = 'PageHeader.Title'

const Actions: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        styles.actions,
        'flex min-w-max flex-row items-start justify-end gap-2'
      )}
    >
      {children}
    </div>
  )
}
Actions.displayName = 'PageHeader.Actions'

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  const breakpoint = useTailwindBreakpoint()
  const validChildren = Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === FooterItem
  )
  const childCount = Children.count(validChildren)

  const isSmallScreen = breakpoint === 'xs' || breakpoint === 'sm'

  return (
    <div
      className={cn(
        styles.footer,
        'flex w-full flex-col flex-wrap items-stretch justify-start gap-y-2 border-b py-6 md:flex-row md:gap-y-4'
      )}
    >
      {Children.map(validChildren, (child, index) => (
        <Fragment key={index}>
          {child}
          {index < childCount - 1 && (
            <PageHeader.FooterItem>
              <Separator
                orientation={isSmallScreen ? 'horizontal' : 'vertical'}
                className="footer-item-separator md:mx-6"
              />
            </PageHeader.FooterItem>
          )}
        </Fragment>
      ))}
    </div>
  )
}
Footer.displayName = 'PageHeader.Footer'

const FooterItem: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-row items-center [&:has(.footer-item-separator)]:hidden [&:has(.footer-item-separator)]:md:flex">
      {children}
    </div>
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
