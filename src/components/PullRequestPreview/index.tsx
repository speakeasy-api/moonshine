import { cn } from '@/lib/utils'
import { Icon } from '../Icon'
import { IconName } from '../Icon/names'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip'
import { format } from 'date-fns'

type Status = 'open' | 'closed' | 'merged'

export interface PullRequestPreviewProps {
  /**
   * The trigger for the PR preview popover
   */
  trigger: React.ReactNode

  number: number
  title: string
  description: string
  status: Status
  baseBranch: string
  headBranch: string
  createdAt: string

  githubOrg: string
  githubRepo: string

  /**
   * Whether the PR can be merged based on the status of the checks
   */
  canMerge: boolean
}

const iconForStatus: Record<Status, IconName> = {
  open: 'git-pull-request-arrow',
  closed: 'git-pull-request-closed',
  merged: 'git-merge',
}

const colorForStatus: Record<Status, string> = {
  open: 'text-green-500',
  closed: 'text-red-500',
  merged: 'text-purple-500',
}

export function PullRequestPreview({
  trigger,
  number,
  title,
  description,
  status,
  baseBranch,
  headBranch,
  createdAt,
  canMerge,
  githubOrg,
  githubRepo,
}: PullRequestPreviewProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          alignOffset={10}
          sideOffset={10}
          className="bg-card min-w-80 max-w-96 p-0"
        >
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-row items-center gap-2">
              <span className="text-muted text-xs font-light">
                <a
                  href={`https://github.com/${githubOrg}/${githubRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-400"
                >
                  {`${githubOrg}/${githubRepo}`}
                </a>{' '}
                on {format(new Date(createdAt), 'MMM d, yyyy')}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start gap-1.5">
                <span title={status}>
                  <Icon
                    name={iconForStatus[status]}
                    className={cn(colorForStatus[status], 'mt-0.5')}
                  />
                </span>

                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-row items-center gap-1">
                    <a
                      href={`https://github.com/${githubOrg}/${githubRepo}/pull/${number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-blue-400"
                    >
                      {title}
                    </a>
                    <span className="text-muted text-xs font-light">
                      #{number}
                    </span>
                  </div>

                  <div
                    className="text-muted max-w-96 text-sm"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />

                  <div className="flex select-none flex-row items-center gap-1">
                    <pre className="text-muted bg-background flex rounded-md px-1 py-0.5 text-xs font-light">
                      {baseBranch}
                    </pre>
                    <Icon name="arrow-left" className="text-muted h-3 w-3" />
                    <pre className="text-muted bg-background flex rounded-md px-1 py-0.5 text-xs font-light">
                      {headBranch}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {status === 'open' && (
            <div className="flex flex-row items-center gap-1.5 border-t px-4 py-3">
              <Icon
                name={canMerge ? 'check' : 'circle'}
                className={cn(
                  canMerge
                    ? 'text-green-500'
                    : 'text-muted h-2 w-2 fill-current'
                )}
              />
              <span className="text-muted text-xs font-medium">
                {canMerge
                  ? 'Pull request is ready to merge'
                  : 'Pull request needs to be updated'}
              </span>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
