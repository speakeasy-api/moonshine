import { Children, cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/utils'
import './skeleton.css'

export interface SkeletonProps {
  /**
   * The children to display in the skeleton.
   * The width and content of each child will be used to determine the width of the skeleton.
   *
   * @example
   * <Skeleton>
   *   <div>foo</div>
   *   <div>bar</div>
   * </Skeleton>
   *
   * You can also provide no content and use classNames to style the skeleton items:
   *
   * @example
   * <Skeleton>
   *   <div className="h-5 w-48 rounded-lg" />
   *   <div className="h-5 w-96 rounded-lg" />
   *   <div className="h-5 w-48 rounded-lg" />
   * </Skeleton>
   */
  children: React.ReactNode
  /**
   * The class name to apply to each child.
   */
  className?: string
}

export function Skeleton({ children, className }: SkeletonProps) {
  return (
    <div className="flex w-full flex-col items-start gap-2.5 select-none">
      {Children.toArray(children).map((child, index) => {
        if (typeof child === 'string') {
          return (
            <div
              key={index}
              className="skeleton h-5 max-w-max min-w-36 rounded-lg text-transparent"
            >
              {child}
            </div>
          )
        }

        if (isValidElement(child))
          return cloneElement<HTMLElement>(
            child as React.ReactElement<HTMLElement>,
            {
              className: cn(
                'skeleton max-w-full text-transparent h-5 rounded-lg',
                className,
                child.props.className
              ),
            }
          )
      })}
    </div>
  )
}
