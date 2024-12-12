import { cn } from '#lib/utils'
import { isValidElement, ReactElement, ReactNode, Children } from 'react'

interface BreadcrumbProps {
  children: ReactElement<typeof BreadcrumbItem>[]
  separator?: ReactNode
}

const defaultSeparator = '/'

const isValidBreadcrumbChild = (child: ReactElement) =>
  isValidElement(child) && child.type === BreadcrumbItem

const Breadcrumb = ({
  children,
  separator = defaultSeparator,
}: BreadcrumbProps) => {
  const validChildren = children.filter(isValidBreadcrumbChild)

  return (
    <div className={cn('flex items-center gap-4')}>
      {Children.map(validChildren, (child, index) => {
        return (
          <>
            {child}
            {index < validChildren.length - 1 && (
              <div className="text-muted">{separator}</div>
            )}
          </>
        )
      })}
    </div>
  )
}

interface BreadcrumbItemProps {
  children: ReactNode
}

const BreadcrumbItem = ({ children }: BreadcrumbItemProps) => {
  return <div>{children}</div>
}

Breadcrumb.Item = BreadcrumbItem

export { Breadcrumb }
