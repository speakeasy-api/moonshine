import React from 'react'
import { Org } from '.'
import { Command, CommandList } from '../Command'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button } from '@/index'

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
      <CommandList className="flex max-h-none flex-grow flex-col">
        <div className="flex flex-grow flex-col justify-center">
          <div className="flex flex-row items-baseline justify-stretch rounded-xl border border-dashed p-6 pb-4">
            <h1 className="text-md font-semibold">{selectedOrg?.label}</h1>
            <span className="text-muted-foreground mx-2 text-sm">/</span>
            <div className="flex flex-col justify-start">
              <input
                ref={createInputRef}
                type="text"
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                placeholder="your-new-workspace"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="border-input bg-background ring-offset-background text-md flex h-10 w-fit min-w-fit flex-1 rounded-md px-2 py-1.5 outline-none invalid:border-b invalid:border-red-400"
              />

              <div
                className="mt-1 text-sm text-red-400"
                style={{
                  visibility:
                    newWorkspaceName &&
                    !newWorkspaceName.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
                      ? 'visible'
                      : 'hidden',
                }}
              >
                Workspace names can only contain lowercase letters, numbers, and
                hyphens
              </div>
            </div>
          </div>
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
