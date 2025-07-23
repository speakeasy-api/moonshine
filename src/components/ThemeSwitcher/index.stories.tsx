import type { Meta, StoryObj } from '@storybook/react'
import { ThemeSwitcher } from '.'

const meta: Meta<typeof Text> = {
  component: ThemeSwitcher,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const LightMode: Story = {
  globals: { theme: 'light' },
}

export const DarkMode: Story = {
  globals: { theme: 'dark' },
}
