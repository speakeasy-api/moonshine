import { Meta, StoryObj } from '@storybook/react'
import DiffSummary from '.'

const meta: Meta<typeof DiffSummary> = {
  component: DiffSummary,
}

export default meta

type Story = StoryObj<typeof DiffSummary>

export const Default: Story = {
  args: {
    addedLines: 10,
    removedLines: 5,
    squareCount: 5,
  },
}

export const ManyLineChanges: Story = {
  args: {
    addedLines: 1500,
    removedLines: 2050,
    squareCount: 5,
  },
}

export const NoChanges: Story = {
  args: {
    addedLines: 0,
    removedLines: 0,
    squareCount: 5,
  },
}

export const NoLabel: Story = {
  args: {
    addedLines: 10,
    removedLines: 5,
    squareCount: 5,
    showLabel: false,
  },
}

export const CustomSquareCount: Story = {
  args: {
    addedLines: 10,
    removedLines: 5,
    squareCount: 10,
  },
}

export const CustomSquareClassName: Story = {
  args: {
    addedLines: 10,
    removedLines: 5,
    squareCount: 5,
    squareClassName: 'size-4',
  },
}
