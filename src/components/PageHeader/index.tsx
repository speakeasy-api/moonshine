import React, { Children, Fragment, PropsWithChildren } from 'react'
import { Heading } from '../Heading'
import { Separator } from '../Separator'

import styles from './styles.module.css'
import { cn } from '@/lib/utils'
import useTailwindBreakpoint from '@/hooks/useTailwindBreakpoint'
import { Link, LinkProps } from '../Link'

interface PageHeaderProps extends PropsWithChildren {
  className?: string
}

const Root: React.FC<PageHeaderProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'page-header group/page-header',
        styles.pageHeader,
        className
      )}
    >
      {children}
    </div>
  )
}

interface ContextBarProps extends PropsWithChildren {
  className?: string
}

const ContextBar: React.FC<ContextBarProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        styles.contextBar,
        'context-bar flex flex-row items-center justify-start pt-6',
        className
      )}
    >
      {children}
    </div>
  )
}
ContextBar.displayName = 'PageHeader.ContextBar'

interface ParentLinkProps
  extends PropsWithChildren<Pick<LinkProps, 'href' | 'onClick'>> {
  className?: string
}

const ParentLink: React.FC<ParentLinkProps> = ({
  children,
  className,
  onClick,
  href,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={className}
      iconPrefixName="arrow-left"
      variant="secondary"
      target="_self"
    >
      {children}
    </Link>
  )
}
ParentLink.displayName = 'PageHeader.ParentLink'

interface TitleBarProps extends PropsWithChildren {
  className?: string
}
const TitleBar: React.FC<TitleBarProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        styles.titleBar,
        'flex flex-row items-center justify-between gap-4 border-b py-10 group-has-[.context-bar]/page-header:pt-8',
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
      className={cn(
        styles.titleArea,
        'flex flex-row items-center gap-2',
        className
      )}
    >
      {children}
    </div>
  )
}
TitleArea.displayName = 'PageHeader.TitleArea'

interface LeadingVisualProps extends PropsWithChildren {
  className?: string
}

const LeadingVisual: React.FC<LeadingVisualProps> = ({
  children,
  className,
}) => {
  return <div className={cn('order-1', className)}>{children}</div>
}
LeadingVisual.displayName = 'PageHeader.LeadingVisual'

interface TitleProps extends PropsWithChildren {
  className?: string
  viewTransitionName?: string
}
const Title: React.FC<TitleProps> = ({
  children,
  className,
  viewTransitionName,
}) => {
  return (
    <Heading
      variant="xl"
      className={cn('order-2 flex-1', className)}
      viewTransitionName={viewTransitionName}
    >
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
  ContextBar,
  ParentLink,
  TitleBar,
  TitleArea,
  LeadingVisual,
  Title,
  Actions,
  Footer,
  FooterItem,
})

PageHeader.displayName = 'PageHeader'
