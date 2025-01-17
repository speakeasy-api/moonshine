import React, { Children, Fragment, PropsWithChildren } from 'react'
import { Heading } from '../Heading'
import { Separator } from '../Separator'

import styles from './styles.module.css'
import { cn } from '@/lib/utils'
import useTailwindBreakpoint from '@/hooks/useTailwindBreakpoint'

interface PageHeaderProps extends PropsWithChildren {
  className?: string
}

const Root: React.FC<PageHeaderProps> = ({ children, className }) => {
  return <div className={cn(styles.pageHeader, className)}>{children}</div>
}

interface TitleBarProps extends PropsWithChildren {
  className?: string
}
const TitleBar: React.FC<TitleBarProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        styles.titleBar,
        'flex flex-row items-center justify-between gap-4 border-b py-10',
        className
      )}
    >
      {children}
    </div>
  )
}
TitleBar.displayName = 'PageHeader.TitleBar'

interface TitleAreaProps extends PropsWithChildren {
  className?: string
}
const TitleArea: React.FC<TitleAreaProps> = ({ children, className }) => {
  return (
    <div
      className={cn(styles.titleArea, 'flex flex-row items-start', className)}
    >
      {children}
    </div>
  )
}
TitleArea.displayName = 'PageHeader.TitleArea'

interface TitleProps extends PropsWithChildren {
  className?: string
}
const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <Heading variant="xl" className={cn('flex-1', className)}>
      {children}
    </Heading>
  )
}
Title.displayName = 'PageHeader.Title'

interface ActionsProps extends PropsWithChildren {
  className?: string
}
const Actions: React.FC<ActionsProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        styles.actions,
        'flex min-w-max flex-row items-start justify-end gap-2',
        className
      )}
    >
      {children}
    </div>
  )
}
Actions.displayName = 'PageHeader.Actions'

interface FooterProps extends PropsWithChildren {
  className?: string
}
const Footer: React.FC<FooterProps> = ({ children, className }) => {
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
        'flex w-full flex-col flex-wrap items-stretch justify-start gap-y-2 border-b py-6 md:flex-row md:gap-y-4',
        className
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

interface FooterItemProps extends PropsWithChildren {
  className?: string
}
const FooterItem: React.FC<FooterItemProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center [&:has(.footer-item-separator)]:hidden [&:has(.footer-item-separator)]:md:flex',
        className
      )}
    >
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
