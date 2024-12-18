import { Heading } from '../Heading'
// TODO: https://linear.app/speakeasy/issue/SXF-169/page-header-component
interface PageHeaderProps {
  title: React.ReactNode
  subtitle?: React.ReactNode

  /**
   * Either an image URL or a React component
   */
  image?: string | React.ReactNode
  children?: React.ReactNode
}

export function PageHeader({
  title,
  subtitle,
  image,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-6">
      <div className="flex flex-row items-center gap-4">
        {image && (
          <div className="max-w-24">
            {typeof image === 'string' ? (
              <img src={image} className="rounded-lg" />
            ) : (
              image
            )}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Heading variant="xl">{title}</Heading>
          {/* TODO: update this to use our own Text component */}
          {subtitle && (
            <p className="text-muted-foreground max-w-lg text-sm">{subtitle}</p>
          )}
        </div>
        <div className="ml-auto">{children}</div>
      </div>
    </div>
  )
}
