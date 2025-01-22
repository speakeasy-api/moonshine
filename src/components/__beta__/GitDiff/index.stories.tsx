import { GitDiff } from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof GitDiff> = {
  component: GitDiff,
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <div className="w-full p-10">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof GitDiff>

const defaultArgs: Story['args'] = {
  filePath: 'src/components/Button/index.tsx',
  sourceLines: ['function add(a, b) {', '  return a + b;', '}'],
  language: 'javascript',
}

export const Modify: Story = {
  args: {
    ...defaultArgs,
    changes: [
      { line: 2, type: 'add', content: 'function subtract(a, b) {' },
      { line: 3, type: 'add', content: '  return a - b;' },
    ],
  },
}

export const Add: Story = {
  args: {
    ...defaultArgs,
    sourceLines: ['function add(a, b) {', '  return a + b;', '}'],
    changes: [{ line: 2, type: 'add', content: 'function add(a, b) {' }],
  },
}

export const Remove: Story = {
  args: {
    ...defaultArgs,
    changes: [{ line: 2, type: 'remove', content: 'function add(a, b) {' }],
  },
}

export const MultiLineModify: Story = {
  args: {
    ...defaultArgs,
    changes: [
      {
        fromLine: 2,
        toLine: 3,
        type: 'add',
        content: 'function add(a, b) {',
      },
    ],
  },
}

export const MultiLineAdd: Story = {
  args: {
    ...defaultArgs,
    changes: [
      { fromLine: 2, toLine: 3, type: 'add', content: 'function add(a, b) {' },
    ],
  },
}

export const MultiLineRemove: Story = {
  args: {
    ...defaultArgs,
    changes: [
      {
        fromLine: 2,
        toLine: 3,
        type: 'remove',
        content: 'function add(a, b) {',
      },
    ],
  },
}

export const Inline: Story = {
  args: {
    ...defaultArgs,
    changes: [
      {
        line: 2,
        type: 'add',
        content: 'addNumber',
        columnStart: 10,
        columnEnd: 12,
      },
    ],
  },
}

export const MixedChanges: Story = {
  args: {
    ...defaultArgs,
    sourceLines: ['function add(a, b) {', '  return a + b;', '}', ''],
    changes: [
      {
        line: 2,
        type: 'add',
        columnStart: 10,
        columnEnd: 12,
        content: 'addNumber',
      },
      { line: 5, type: 'remove' },
    ],
  },
}

export const LotsOfLines: Story = {
  args: {
    ...defaultArgs,
    sourceLines: [
      'function add(a, b) {',
      '  return a + b;',
      '}',
      '',
      'function subtract(a, b) {',
      '  return a - b;',
      '}',
      '',
      'function multiply(a, b) {',
      '  return a * b;',
      '}',
      '',
      'function divide(a, b) {',
      '  return a / b;',
      '}',
    ],
    changes: [
      { line: 2, type: 'add', content: 'function addNumber(a, b) {' },
      { type: 'remove', fromLine: 5, toLine: 8 },
    ],
  },
}
