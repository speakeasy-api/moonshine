import { gapMapper } from '@/lib/responsiveUtils'
import { cn } from '@/lib/utils'
import { getResponsiveClasses } from '@/lib/utils'
import { ResponsiveValue } from '@/types'
import { Gap } from '@/types'
import { isValidElement, ReactElement, ReactNode, Children } from 'react'

interface BreadcrumbProps {
  children: ReactElement<typeof BreadcrumbItem>[]
  separator?: ReactNode
  gap?: ResponsiveValue<Gap>
}

const defaultSeparator = <div className="text-muted">{'/'}</div>

const isValidBreadcrumbChild = (child: ReactElement) =>
  isValidElement(child) && child.type === BreadcrumbItem

const Breadcrumb = ({
  children,
  separator = defaultSeparator,
  gap = 6,
}: BreadcrumbProps) => {
  const validChildren = children.filter(isValidBreadcrumbChild)

  return (
    <div
      className={cn('flex items-center', getResponsiveClasses(gap, gapMapper))}
    >
      {Children.map(validChildren, (child, index) => {
        return (
          <>
            {child}
            {index < validChildren.length - 1 && separator}
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
