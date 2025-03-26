import { CodeEditor } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker'
import { Icon } from '@/components/Icon'
import { Key } from '../KeyHint'

faker.seed(123)

const meta: Meta<typeof CodeEditor> = {
  component: CodeEditor,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-background/10 flex h-screen w-screen">
        <div className="m-6 flex w-full">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof CodeEditor>

export const Default: Story = {
  args: {
    children: [
      <CodeEditor.CommandBar className="py-2">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-red-500 stroke-red-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-yellow-500 stroke-yellow-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-green-500 stroke-green-500"
            />
          </div>
          <div className="bg-background ml-auto flex w-full max-w-sm items-center gap-2 rounded-lg border px-2 py-1">
            <Icon name="search" className="h-3 w-3" />
            <input
              type="text"
              className="w-full flex-1 bg-transparent text-sm outline-none"
              placeholder="moonshine"
            />
          </div>
        </div>
      </CodeEditor.CommandBar>,
      <CodeEditor.Pane defaultSize={15} minSize={15}>
        <div className="px-2 py-1">Sidebar</div>
      </CodeEditor.Pane>,
      <CodeEditor.Pane minSize={50}>
        <CodeEditor.Tabs>
          <CodeEditor.Tab
            id="openapi.yml"
            active
            title="openapi.yml"
            closable
            dirty
          />
          <CodeEditor.Tab id="README.md" title="README.md" closable />
          <CodeEditor.Tab id="src/index.ts" title="src/index.ts" closable />
          <CodeEditor.Tab id="src/auth.ts" title="src/auth.ts" closable />
          <CodeEditor.Tab
            id="src/utils/models/ancillary/user.ts"
            title="src/utils/models/ancillary/user.ts"
          />
          <CodeEditor.Tab id="package.json" title="package.json" />
        </CodeEditor.Tabs>

        <div className="px-2 py-1">
          {Array.from({ length: 40 }).map((_, index) => (
            <div key={index} className="mb-4">
              {faker.lorem.paragraph()}
            </div>
          ))}
        </div>
      </CodeEditor.Pane>,
    ],
  },
}

export const Empty: Story = {
  args: {
    children: [
      <CodeEditor.CommandBar className="border-b py-2">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-red-500 stroke-red-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-yellow-500 stroke-yellow-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-green-500 stroke-green-500"
            />
          </div>
          <div className="bg-background ml-auto flex w-full max-w-sm items-center gap-2 rounded-lg border px-2 py-1">
            <Icon name="search" className="h-3 w-3" />
            <input
              type="text"
              className="w-full flex-1 bg-transparent text-sm outline-none"
              placeholder="moonshine"
            />
          </div>
        </div>
      </CodeEditor.CommandBar>,
      <CodeEditor.Empty>
        <div className="bg-muted flex h-full flex-col items-center justify-center p-3">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-lg font-semibold">No Tabs Open</h2>
              <p className="text-muted-foreground text-muted text-sm">
                Open a file to get started
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Key value="⌘" />
              <span>+</span>
              <Key value="P" />
            </div>
          </div>
        </div>
      </CodeEditor.Empty>,
    ],
  },
}

export const SplitScreen: Story = {
  args: {
    children: [
      <CodeEditor.CommandBar className="py-2">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-red-500 stroke-red-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-yellow-500 stroke-yellow-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-green-500 stroke-green-500"
            />
          </div>
          <div className="bg-background ml-auto flex w-full max-w-sm items-center gap-2 rounded-lg border px-2 py-1">
            <Icon name="search" className="h-3 w-3" />
            <input
              type="text"
              className="w-full flex-1 bg-transparent text-sm outline-none"
              placeholder="picz of cats"
            />
          </div>
        </div>
      </CodeEditor.CommandBar>,
      <CodeEditor.Pane>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'url(https://placecats.com/600/800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </CodeEditor.Pane>,
      <CodeEditor.Pane>
        <CodeEditor.Tabs>
          <CodeEditor.Tab
            id="cat-breeds"
            active
            title="Cat Breeds"
            closable
            dirty
          />
        </CodeEditor.Tabs>

        <ul className="list-inside list-disc px-2 py-1">
          {Array.from({ length: 40 }).map((_, index) => (
            <li key={index} className="mb-2">
              {faker.animal.cat()}
            </li>
          ))}
        </ul>
      </CodeEditor.Pane>,
    ],
  },
}

export const WithTabIcons: Story = {
  args: {
    children: [
      <CodeEditor.CommandBar className="py-2">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-red-500 stroke-red-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-yellow-500 stroke-yellow-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-green-500 stroke-green-500"
            />
          </div>
          <div className="bg-background ml-auto flex w-full max-w-sm items-center gap-2 rounded-lg border px-2 py-1">
            <Icon name="search" className="h-3 w-3" />
            <input
              type="text"
              className="w-full flex-1 bg-transparent text-sm outline-none"
              placeholder="moonshine"
            />
          </div>
        </div>
      </CodeEditor.CommandBar>,
      <CodeEditor.Pane minSize={15} maxSize={30}>
        <div className="px-2 py-1">Sidebar</div>
      </CodeEditor.Pane>,
      <CodeEditor.Pane minSize={40}>
        <CodeEditor.Tabs>
          <CodeEditor.Tab
            id="openapi.yml"
            active
            title="openapi.yml"
            closable
            icon={<Icon name="file" className="h-3 w-3" />}
            dirty
          />
          <CodeEditor.Tab
            id="README.md"
            title="README.md"
            icon={<Icon name="file" className="h-3 w-3" />}
            closable
          />
        </CodeEditor.Tabs>

        <div className="px-2 py-1">
          {Array.from({ length: 40 }).map((_, index) => (
            <div key={index} className="mb-4">
              {faker.lorem.paragraph()}
            </div>
          ))}
        </div>
      </CodeEditor.Pane>,
    ],
  },
}

export const TabStates: Story = {
  args: {
    children: [
      <CodeEditor.Pane minSize={100}>
        <CodeEditor.Tabs>
          <CodeEditor.Tab
            id="active-not-dirty-and-invalid"
            active
            invalid
            title="openapi.yml"
            closable
            icon={<Icon name="file" className="h-3 w-3" />}
          />
          <CodeEditor.Tab
            id="dirty-not-active-and-invalid"
            dirty
            title="README.md"
            icon={<Icon name="file" className="h-3 w-3" />}
            closable
          />
          <CodeEditor.Tab
            id="active-not-dirty-and-valid"
            title="README.md"
            icon={<Icon name="file" className="h-3 w-3" />}
            closable
            invalid
            dirty
          />
          <CodeEditor.Tab
            id="dirty-not-closable"
            title="FOO.md"
            icon={<Icon name="file" className="h-3 w-3" />}
            closable={false}
            dirty
          />
          <CodeEditor.Tab
            id="disabled"
            title="BAR.md"
            icon={<Icon name="file" className="h-3 w-3" />}
            disabled
          />
          <CodeEditor.Tab
            id="loading"
            title={
              <div className="flex w-full items-center gap-1">
                <span>https://foo.com/file.json</span>
                <Icon name="loader-circle" className="h-4 w-4 animate-spin" />
              </div>
            }
            disabled
            className="cursor-progress"
          />
        </CodeEditor.Tabs>
        <div className="px-2 py-1">
          {Array.from({ length: 40 }).map((_, index) => (
            <div key={index} className="mb-4">
              {faker.lorem.paragraph()}
            </div>
          ))}
        </div>
      </CodeEditor.Pane>,
    ],
  },
}

export const NoTabs: Story = {
  args: {
    children: [
      <CodeEditor.CommandBar className="py-2">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-red-500 stroke-red-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-yellow-500 stroke-yellow-500"
            />
            <Icon
              name="circle"
              className="h-3.5 w-3.5 rounded-full fill-green-500 stroke-green-500"
            />
          </div>
        </div>
      </CodeEditor.CommandBar>,
      <CodeEditor.Pane minSize={100}>
        {Array.from({ length: 40 }).map((_, index) => (
          <div key={index} className="mb-4">
            {faker.lorem.paragraph()}
          </div>
        ))}
      </CodeEditor.Pane>,
      <CodeEditor.Pane minSize={15} maxSize={30}>
        <div>Sidebar</div>
      </CodeEditor.Pane>,
    ],
  },
}
