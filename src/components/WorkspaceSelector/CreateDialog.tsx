import React from 'react'
import { Org } from '.'
import { Command } from '../Command'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button } from '@/index'
import { Separator } from '../Separator'
import { GradientCircle } from './GradientCircle'
interface CreateDialogProps {
  open: boolean
  selectedOrg: Org
  onClose: () => void
  onSubmit: (workspaceName: string) => void
  newWorkspaceName: string
  setNewWorkspaceName: (name: string) => void
}

export function CreateDialog({
  open,
  selectedOrg,
  onClose,
  onSubmit,
  newWorkspaceName,
  setNewWorkspaceName,
}: CreateDialogProps) {
  const createInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        createInputRef.current?.focus()
      }, 300)
    }
  }, [open])

  const focusInput = () => {
    createInputRef.current?.focus()
  }

  const handleSubmit = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        onSubmit(newWorkspaceName)
      })
    } else {
      onSubmit(newWorkspaceName)
    }
  }

  return (
    <Command className="p-8">
      <div className="max-w-2/3 mx-auto flex h-full w-full flex-row items-center justify-around gap-10">
        <div
          className="flex flex-col items-center justify-center gap-2 text-center"
          style={{ flex: 3 }}
        >
          <GradientCircle name={selectedOrg.label} size="2xl" />
          <Text variant="h3">Create new workspace</Text>
          <div className="max-w-[250px]">
            <Text variant="muted">
              Workspaces are used to organize your SDK targets into logical
              groups.
            </Text>
          </div>
        </div>

        <Separator orientation="vertical" />

        <div
          className="flex flex-col items-start justify-center gap-2"
          style={{ flex: 5 }}
        >
          <div className="flex flex-col gap-3">
            <Text variant="h4">Choose your workspace name</Text>
            <Text variant="muted">
              Enter a name for your new workspace. Names must be in slug format;
              only lowercase letters, numbers, and hyphens are allowed.
            </Text>
          </div>
          <div
            className="focus-within:outline-muted/50 shadow-muted bg-input/10 border-input mt-5 flex w-full flex-row items-center justify-stretch gap-2 rounded-md px-4 py-1 focus-within:shadow-sm focus-within:outline focus-within:outline-1 focus-within:outline-offset-0"
            onClick={focusInput}
          >
            <span className="text-md text-foreground select-none text-nowrap text-lg font-semibold">
              {selectedOrg?.label}
            </span>
            <span className="text-muted-foreground/50 mx-2 select-none text-lg">
              /
            </span>
            <div className="flex w-full">
              <input
                ref={createInputRef}
                type="text"
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                placeholder="your-new-workspace"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                style={{ width: `${newWorkspaceName.length * 5}px` }}
                className="border-input text-foreground/80 placeholder:text-muted-foreground/50 ring-offset-background text-md flex h-10 w-full min-w-fit flex-1 flex-grow bg-transparent px-2 py-1.5 pl-0 text-lg outline-none invalid:border-b invalid:border-red-400"
              />
            </div>
          </div>
          <div className="mt-2 h-6">
            {newWorkspaceName &&
              !newWorkspaceName.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) && (
                <div className="text-sm text-red-400">
                  Workspace names can only contain lowercase letters, numbers,
                  and hyphens
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="mt-auto flex">
        <Button variant="outline" onClick={onClose}>
          <Icon name="chevron-left" size="small" />
          Back
        </Button>
        <div className="ml-auto">
          <Button
            variant="secondary"
            disabled={
              !newWorkspaceName ||
              !newWorkspaceName.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            }
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </div>
    </Command>
  )
}
