import { useRef, useState, useEffect } from 'react'
import { Org } from '.'
import { Command } from '../Command'
import { Stack } from '../Stack'
import { GradientCircle } from '../GradientCircle'
import { Separator } from '../Separator'
import { Text } from '../Text'
import { Button } from '../Button'
import { Heading } from '@/index'

interface CreateOrgProps {
  onSubmit: (name: string) => Promise<Org>
}

export function CreateOrg({ onSubmit }: CreateOrgProps) {
  const [companyName, setCompanyName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <Command className="relative">
      <div className="flex h-full w-full flex-row items-center">
        <div className="flex w-1/3 flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <GradientCircle
              name={companyName}
              size="2xl"
              transition
              showInitial
            />
            <Stack align="center" gap={2}>
              <Heading variant="xl">Create new company</Heading>
              <div className="max-w-64">
                <Text muted>
                  Once you have created your company, we'll take you through
                  some onboarding steps to get you started with Speakeasy.
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
                <Text variant="lg">Enter your company name</Text>
                <Text muted>
                  We will automatically generate a unique, URL-friendly slug
                  based off your company name.
                </Text>
              </Stack>
            </div>
            <div className="flex flex-col">
              <div className="focus-within:outline-muted/50 shadow-muted bg-input/10 border-neutral-softest ease-in-out-expo mt-5 flex w-full max-w-[660px] flex-row items-center justify-stretch gap-2 rounded-md border px-4 py-1 transition-[border-color] duration-500 focus-within:shadow-sm focus-within:outline focus-within:outline-offset-0 data-[invalid=true]:border-red-400/75">
                <div className="flex w-full">
                  <input
                    type="text"
                    role="textbox"
                    name="companyName"
                    pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                    ref={inputRef}
                    placeholder="Your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="border-neutral-softest text-foreground/80 placeholder:text-muted-foreground/50 ring-offset-background text-md flex h-10 w-full min-w-fit flex-1 flex-grow bg-transparent px-2 py-1.5 pl-0 text-lg outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-neutral-softest bg-background flex border-t px-8 py-4">
        <div className="ml-auto">
          <Button
            variant="secondary"
            disabled={!companyName}
            onClick={() => onSubmit(companyName)}
          >
            Next
          </Button>
        </div>
      </div>
    </Command>
  )
}
