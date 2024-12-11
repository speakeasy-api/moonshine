import type { Meta, StoryObj } from '@storybook/react'
import { Column, Table, TableProps } from '.'
import { faker } from '@faker-js/faker'
import { useState } from 'react'
import { SupportedLanguage, supportedLanguages } from '@/types'
import { TargetLanguageIcon } from '../TargetLanguageIcon'
import { formatDistance } from 'date-fns'

const meta: Meta<typeof Table> = {
  component: Table,
  decorators: [
    (Story) => (
      <div className="mx-auto my-10 max-w-screen-lg">
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

const defaultArgs: TableProps<SDK> = {
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
      width: '1fr',
      render: (version) => (
        <div className="text-muted-foreground">{version.toString()}</div>
      ),
    },
    {
      key: 'lastGeneratedAt',
      header: 'Last Generated',
      width: '1fr',
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

const TableWithState = (args: TableProps<SDK>) => {
  const [data, setData] = useState(args.data)
  return (
    <Table
      {...args}
      data={data}
      onLoadMore={() => {
        setData((prev) => [...prev, ...generateSDKs(2)])
      }}
    />
  )
}

export const Default: StoryObj<typeof Table<SDK>> = {
  args: defaultArgs,
  render: (args) => <TableWithState {...args} />,
}
