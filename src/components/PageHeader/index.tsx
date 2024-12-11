interface PageHeaderProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  imageUrl?: string | React.ReactNode
  children?: React.ReactNode
}

export function PageHeader({
  title,
  subtitle,
  imageUrl,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-6">
      <div className="flex flex-row gap-6">
        {imageUrl && (
          <div className="max-w-24">
            {typeof imageUrl === 'string' ? (
              <img src={imageUrl} className="rounded-lg" />
            ) : (
              imageUrl
            )}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground max-w-lg text-sm">{subtitle}</p>
          )}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
