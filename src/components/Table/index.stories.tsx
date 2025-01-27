import type { Meta, StoryObj } from '@storybook/react'
import { Column, Group, Table, TableProps } from '.'
import { faker } from '@faker-js/faker'
import { useState } from 'react'
import { SupportedLanguage, supportedLanguages } from '@/types'
import { TargetLanguageIcon } from '../TargetLanguageIcon'
import { formatDistance } from 'date-fns'
import { Icon } from '../Icon'

const meta: Meta<typeof Table> = {
  component: Table,
  decorators: [
    (Story) => (
      <div className="mx-auto my-10">
        <Story />
      </div>
    ),
  ],
}

export default meta

interface SDK {
  name: string
  org: string
  version: string
  lastGeneratedAt: Date
  description: string
  language: SupportedLanguage
  githubRepoUrl: string
}

function generateSDKs(count: number): SDK[] {
  return Array.from({ length: count }, (_, i) => ({
    name: faker.lorem.slug({ min: 1, max: 1 }),
    org: faker.lorem.slug({ min: 1, max: 1 }),
    version: `v${faker.number.int({ min: 1, max: 10 })}.${faker.number.int({
      min: 0,
      max: 9,
    })}.${faker.number.int({ min: 0, max: 9 })}`,
    lastGeneratedAt: faker.date.recent({ days: i + 1 }),
    description: faker.commerce.productDescription(),
    language: faker.helpers.arrayElement(supportedLanguages),
    githubRepoUrl: faker.internet.url(),
  }))
}

const sdk: SDK[] = generateSDKs(5)

const defaultArgs: ListTableProps = {
  columns: [
    {
      key: 'language',
      header: undefined,
      width: '0.5fr',
      render: (row) => <TargetLanguageIcon language={row.language} />,
    },
    {
      key: 'name',
      header: 'SDK',
      width: '1fr',
      render: (row) => (
        <div className="text-muted-foreground flex flex-row items-center gap-1">
          <span>
            {row.org}/{row.name}
          </span>
        </div>
      ),
    },
    {
      key: 'version',
      header: 'Version',
      width: '0.75fr',
      render: (row) => (
        <div className="text-muted-foreground">{row.version.toString()}</div>
      ),
    },
    {
      key: 'lastGeneratedAt',
      header: 'Last Generated',
      width: '1.25fr',
      render: (row) => (
        <div className="text-muted-foreground">
          {formatDistance(row.lastGeneratedAt, new Date(), { addSuffix: true })}
        </div>
      ),
    },
    {
      key: 'githubRepoUrl',
      header: 'GitHub Repo',
      width: '4fr',
      render: (row) => (
        <div>
          <a href="#" className="text-muted-foreground">
            github.com/{row.name}/{row.org}
          </a>
        </div>
      ),
    },
  ] as Column<SDK>[],
  data: sdk,
  rowKey: (row: SDK) => row.name,
  hasMore: true,
}

type ListTableProps = TableProps<SDK> & { data: SDK[] }

const TableWithState = (args: ListTableProps) => {
  const [data, setData] = useState<SDK[]>(args.data)
  return (
    <Table
      {...args}
      data={data}
      onLoadMore={async () => {
        setData((prev) => [...prev, ...generateSDKs(2)])
      }}
    />
  )
}

export const Default: StoryObj<ListTableProps> = {
  args: defaultArgs,
  render: (args) => <TableWithState {...args} />,
}

export const Condensed: StoryObj<ListTableProps> = {
  args: {
    ...defaultArgs,
    cellPadding: 'condensed',
  },
  render: (args) => <TableWithState {...args} />,
}

export const Spacious: StoryObj<ListTableProps> = {
  args: {
    ...defaultArgs,
    cellPadding: 'spacious',
  },
  render: (args) => <TableWithState {...args} />,
}

type GroupedTableProps = TableProps<SDK> & { data: Group<SDK>[] }

const GroupedTableWithState = (args: GroupedTableProps) => {
  const [data, setData] = useState<Group<SDK>[]>(args.data)
  return (
    <Table
      {...args}
      data={data}
      onLoadMore={async () => {
        setData((prev) => [
          ...prev,
          { key: 'my-new-source', items: generateSDKs(2), count: 2 },
        ])
      }}
    />
  )
}

export const Grouped: StoryObj<GroupedTableProps> = {
  args: {
    ...defaultArgs,
    data: [
      { key: 'my-source', items: sdk.slice(0, 2), count: 2 },
      { key: 'my-other-source', items: sdk.slice(2, 4), count: 2 },
    ],
    renderGroupHeader: (group) => (
      <div className="text-muted-foreground flex w-full flex-row items-center gap-2 border-b bg-zinc-50 px-4 py-2 font-semibold dark:bg-zinc-900">
        <Icon name="code" />
        {group.key} ({group.count as number} SDKs total)
      </div>
    ),
  },
  render: (args) => <GroupedTableWithState {...args} />,
}

export const WithLotsOfColumns: StoryObj<ListTableProps> = {
  args: {
    ...defaultArgs,
    columns: defaultArgs.columns.concat(defaultArgs.columns),
  },
  render: (args) => <TableWithState {...args} />,
}
