import { Children, Fragment, PropsWithChildren } from 'react'
import { Heading } from '../Heading'
import { Separator } from '../Separator'

import styles from './styles.module.css'
import { cn } from '@/lib/utils'

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
  const childCount = Children.count(children)

  return (
    <div
      className={cn(
        styles.footer,
        'flex w-full flex-row items-stretch justify-start border-b py-6'
      )}
    >
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          {child}
          {index < childCount - 1 && (
            <PageHeader.FooterItem>
              <Separator orientation="vertical" className="mx-6" />
            </PageHeader.FooterItem>
          )}
        </Fragment>
      ))}
    </div>
  )
}
Footer.displayName = 'PageHeader.Footer'

const FooterItem: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-row items-center">{children}</div>
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
