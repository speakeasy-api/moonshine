import React, { useCallback, useEffect, useState } from 'react'
import { Org } from '.'
import { Command } from '../Command'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button, Heading, Stack } from '@/index'
import { Separator } from '../Separator'
import { GradientCircle } from '../GradientCircle'

import { cn } from '@/lib/utils'
import { OrgSelector } from './OrgSelector'

export interface CreateResult {
  success: boolean
  error?: string
}

interface CreateWorkspaceProps {
  open: boolean
  selectedOrg: Org
  allOrgs: Org[]
  onBack?: () => void
  onSubmit: (org: Org, workspaceName: string) => Promise<CreateResult>
  newWorkspaceName: string
  setNewWorkspaceName: (name: string) => void
  backButtonEnabled?: boolean
}

export function CreateWorkspace({
  open,
  selectedOrg,
  allOrgs,
  onBack,
  onSubmit,
  newWorkspaceName,
  setNewWorkspaceName,
  backButtonEnabled = true,
}: CreateWorkspaceProps) {
  const createInputRef = React.useRef<HTMLInputElement>(null)
  const [isInvalid, setIsInvalid] = useState(false)
  const [currentOrg, setCurrentOrg] = useState(selectedOrg)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        createInputRef.current?.focus()
      }, 300)
    }
  }, [open])

  useEffect(() => {
    // Focus the input when the org changes
    focusInput()
  }, [currentOrg])

  const focusInput = () => {
    createInputRef.current?.focus()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const result = await onSubmit(currentOrg, newWorkspaceName)
    setIsSubmitting(false)
    if (!result.success) {
      setError(result.error ?? 'Unknown error')
    }
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewWorkspaceName(e.target.value)
      setIsInvalid(!e.target.validity.valid)
    },
    [setNewWorkspaceName, setIsInvalid]
  )

  return (
    <Command className="relative">
      <div className="flex h-full w-full flex-row items-center">
        <div className="flex w-1/3 flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <GradientCircle name={currentOrg.label} size="2xl" showInitial />
            <Stack align="center" gap={2}>
              <Heading variant="xl">Create new workspace</Heading>
              <div className="max-w-64">
                <Text muted>
                  Workspaces are used to organize your SDK targets into logical
                  groups.
                </Text>
              </div>
            </Stack>
          </div>
        </div>

        <Separator orientation="vertical" />

        <div className="flex w-2/3 flex-col items-center justify-center px-8">
          <div className="flex max-w-lg flex-col">
            <div className="flex flex-col gap-4">
              <Stack align="start" gap={2}>
                <Text variant="lg">Choose your workspace name</Text>
                <Text muted>
                  Enter a name for your new workspace. Names must be in slug
                  format; only lowercase letters, numbers, and hyphens are
                  allowed.
                </Text>
              </Stack>
            </div>
            <div className="flex flex-col">
              <div
                className="focus-within:outline-muted/50 shadow-muted bg-input/10 border-neutral-softest ease-in-out-expo mt-5 flex w-full max-w-[660px] flex-row items-center justify-stretch gap-2 rounded-md border px-4 py-1 transition-[border-color] duration-500 focus-within:shadow-sm focus-within:outline focus-within:outline-1 focus-within:outline-offset-0 data-[invalid=true]:border-red-400/75"
                onClick={focusInput}
                data-invalid={isInvalid}
              >
                {allOrgs.length > 1 ? (
                  <OrgSelector
                    orgs={allOrgs}
                    selectedOrg={currentOrg}
                    onSelect={setCurrentOrg}
                  />
                ) : (
                  <span
                    title={currentOrg.slug}
                    className={cn(
                      'text-foreground/80 text-lg font-semibold whitespace-pre select-none',
                      currentOrg.slug.length > 20 &&
                        'max-w-40 truncate whitespace-pre'
                    )}
                  >
                    {currentOrg.slug}
                  </span>
                )}
                <span className="text-muted-foreground/50 mx-2 text-lg select-none">
                  /
                </span>
                <div className="flex w-full">
                  <input
                    ref={createInputRef}
                    type="text"
                    pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                    role="textbox"
                    name="workspaceName"
                    placeholder="your-new-workspace"
                    value={newWorkspaceName}
                    onChange={handleChange}
                    className="border-neutral-softest text-foreground/80 placeholder:text-muted-foreground/50 ring-offset-background text-md flex h-10 w-full min-w-fit flex-1 flex-grow bg-transparent px-2 py-1.5 pl-0 text-lg outline-none"
                  />
                </div>
              </div>

              <div className="mt-2.5 min-h-6 self-start">
                {newWorkspaceName &&
                  !newWorkspaceName.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) && (
                    <div className="text-sm text-red-400/75">
                      Workspace names can only contain lowercase letters,
                      numbers, and hyphens
                    </div>
                  )}
                {error && (
                  <div className="text-sm text-red-400/75">{error}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-neutral-softest bg-background flex border-t px-8 py-4">
        {backButtonEnabled && onBack && (
          <Button variant="secondary" onClick={onBack}>
            <Icon name="chevron-left" size="small" />
            Back
          </Button>
        )}
        <div className="ml-auto">
          <Button
            variant="secondary"
            disabled={
              !newWorkspaceName ||
              !newWorkspaceName.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            }
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <Icon name="loader" className="animate-spin" />
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </div>
    </Command>
  )
}
