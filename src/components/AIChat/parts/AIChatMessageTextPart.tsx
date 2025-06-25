import { cn } from '../../../lib/utils'
import type { BasePartProps } from '../types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface AIChatMessageTextPartProps extends BasePartProps {
  text: string
}

// The line-heights here have been left as the prose defaults for now, ideally they should be adjusted to match the design system
export function AIChatMessageTextPart({
  text,
  className,
}: AIChatMessageTextPartProps) {
  return (
    <div
      className={cn(
        'prose prose-sm dark:prose-invert min-w-0 break-words',
        'prose-headings:font-light prose-headings:tracking-[0.0015em]',
        'prose-h1:text-heading-xl',
        'prose-h2:text-heading-lg',
        'prose-h3:text-heading-md',
        'prose-h4:text-heading-sm',
        'prose-h5:text-heading-xs',
        'prose-p:font-normal prose-p:tracking-[0.0025em]',
        'prose-a:text-link prose-a:font-normal prose-a:underline-offset-4 prose-a:decoration-1 prose-a:tracking-[0.0025em]',
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  )
}
