import React from 'react'
import { Org } from '.'
import { Command, CommandList } from '../Command'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button, Separator } from '@/index'

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

  return (
    <Command className="p-8">
      <div className="flex flex-col gap-2">
        <Text variant="h3">Create new workspace</Text>
        <Text variant="muted">
          Workspaces are used to organize your SDK targets into logical groups.
        </Text>
      </div>
      <div className="mt-6">
        <Separator />
      </div>
      <CommandList className="flex max-h-none flex-grow flex-col">
        <div className="border-border my-6 flex w-full flex-col items-stretch justify-center rounded-lg border p-10">
          <div className="flex flex-grow flex-row items-center justify-stretch">
            <span className="text-md font-semibold">{selectedOrg?.label}</span>
            <span className="text-muted-foreground mx-2 text-sm">/</span>
            <div className="flex w-full flex-1">
              <input
                ref={createInputRef}
                type="text"
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                placeholder="your-new-workspace"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="border-input bg-background ring-offset-background text-muted-foreground text-md flex h-10 w-fit min-w-fit flex-1 rounded-md px-2 py-1.5 pl-0 outline-none invalid:border-b invalid:border-red-400"
              />
            </div>
          </div>
          {newWorkspaceName &&
            !newWorkspaceName.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) && (
              <div className="mt-1 text-sm text-red-400">
                Workspace names can only contain lowercase letters, numbers, and
                hyphens
              </div>
            )}
        </div>
      </CommandList>

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
            onClick={() => onSubmit(newWorkspaceName)}
          >
            Create
          </Button>
        </div>
      </div>
    </Command>
  )
}
