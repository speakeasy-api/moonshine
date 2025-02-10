import { CodeEditor } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker'
import { Icon } from '@/components/Icon'

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
      <CodeEditor.Sidebar>
        <div>Sidebar</div>
      </CodeEditor.Sidebar>,
      <CodeEditor.Content>
        {Array.from({ length: 40 }).map((_, index) => (
          <div key={index} className="mb-4">
            {faker.lorem.paragraph()}
          </div>
        ))}
      </CodeEditor.Content>,
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
      </CodeEditor.Tabs>,
    ],
  },
}

export const SidebarLast: Story = {
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
              placeholder="Search README"
            />
          </div>
        </div>
      </CodeEditor.CommandBar>,
      <CodeEditor.Sidebar className="min-w-96">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">README Outline</h2>

          <ul className="list-inside list-disc">
            <li>
              <a href="#installation">Installation</a>
            </li>
            <li>
              <a href="#usage">Usage</a>
            </li>
            <li>
              <a href="#configuration">Configuration</a>
            </li>
            <li>
              <a href="#contributing">Contributing</a>
            </li>
            <li>
              <a href="#license">License</a>
            </li>
          </ul>
        </div>
      </CodeEditor.Sidebar>,
      <CodeEditor.Content>
        {Array.from({ length: 40 }).map((_, index) => (
          <div key={index} className="mb-4">
            {faker.lorem.paragraph()}
          </div>
        ))}
      </CodeEditor.Content>,
      <CodeEditor.Tabs>
        <CodeEditor.Tab id="README.md" title="README.md" closable active />
      </CodeEditor.Tabs>,
    ],
    order: 'sidebar-last',
  },
}
