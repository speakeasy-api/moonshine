import { cn } from '@/lib/utils'
import { isValidElement, ReactElement, ReactNode, Children } from 'react'

interface BreadcrumbProps {
  children: ReactElement<typeof BreadcrumbItem>[]
  separator?: ReactNode
  className?: string
}

const defaultSeparator = '/'

const isValidBreadcrumbChild = (child: ReactElement) =>
  isValidElement(child) && child.type === BreadcrumbItem

const Breadcrumb = ({
  children,
  separator = defaultSeparator,
  className,
}: BreadcrumbProps) => {
  const validChildren = children.filter(isValidBreadcrumbChild)

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {Children.map(validChildren, (child, index) => {
        return (
          <>
            {child}
            {index < validChildren.length - 1 && (
              <div className="text-body-muted">{separator}</div>
            )}
          </>
        )
      })}
    </div>
  )
}

interface BreadcrumbItemProps {
  children: ReactNode
  className?: string
}

const BreadcrumbItem = ({ children, className }: BreadcrumbItemProps) => {
  return <div className={className}>{children}</div>
}

Breadcrumb.Item = BreadcrumbItem

export { Breadcrumb }
