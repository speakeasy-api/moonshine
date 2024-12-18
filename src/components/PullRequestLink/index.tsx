// TODO: https://linear.app/speakeasy/issue/SXF-174/pull-request-link-component
import { assertNever } from '@/lib/assert'
import { GitPullRequest, GitPullRequestClosed, Merge } from 'lucide-react'

type Status = 'open' | 'closed' | 'merged'

interface PullRequestLinkProps {
  href: string
  prNumber: number
  status?: Status
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export function PullRequestLink({
  href,
  prNumber,
  status = 'open',
  target = '_blank',
}: PullRequestLinkProps) {
  return (
    <a
      className="hover:bg-muted-foreground/5 inline-flex flex-row items-center gap-1 rounded-lg border px-1.5 py-1 text-sm transition-colors duration-500"
      href={href}
      target={target}
    >
      <span className={colors[status]}>
        <PullRequestStatusIcon status={status} />
      </span>
      <span className="text-muted-foreground text-xs font-semibold">
        {'#'}
        {prNumber}
      </span>
    </a>
  )
}

const colors: Record<Status, string> = {
  open: 'text-green-500',
  closed: 'text-red-500',
  merged: 'text-purple-500',
}

function PullRequestStatusIcon({
  status,
}: {
  status: 'open' | 'closed' | 'merged'
}): React.ReactNode {
  switch (status) {
    case 'open':
      return <GitPullRequest size={14} />
    case 'closed':
      return <GitPullRequestClosed size={14} />
    case 'merged':
      return <Merge size={14} />
    default:
      assertNever(status)
  }
}
