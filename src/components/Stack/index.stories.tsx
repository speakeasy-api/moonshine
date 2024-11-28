import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './index'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Stack>

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded bg-blue-100 p-4">{children}</div>
)

// Basic vertical stack (default)
export const Basic: Story = {
  render: () => (
    <Stack gap={2}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

// Horizontal layout
export const Row: Story = {
  render: () => (
    <Stack direction="row" gap={2}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

// Navigation-like layout with space-between
export const NavigationLayout: Story = {
  render: () => (
    <div className="w-[600px] bg-gray-100">
      <Stack direction="row" justify="between" padding={4}>
        <Box>Logo</Box>
        <Stack direction="row" gap={2}>
          <Box>Menu 1</Box>
          <Box>Menu 2</Box>
          <Box>Menu 3</Box>
        </Stack>
      </Stack>
    </div>
  ),
}

// Card-like layout with header and content
export const CardLayout: Story = {
  render: () => (
    <div className="w-[300px] bg-gray-100">
      <Stack gap={4} padding={4}>
        <Stack gap={2}>
          <Box>Card Title</Box>
          <Box>Subtitle</Box>
        </Stack>
        <Box>Main content area</Box>
        <Stack direction="row" gap={2}>
          <Box>Action 1</Box>
          <Box>Action 2</Box>
        </Stack>
      </Stack>
    </div>
  ),
}

// Form-like layout
export const FormLayout: Story = {
  render: () => (
    <div className="w-[400px] bg-gray-100">
      <Stack gap={4} padding={4}>
        <Box>Form Title</Box>
        <Stack gap={2}>
          <Box>Input Field 1</Box>
          <Box>Input Field 2</Box>
          <Box>Input Field 3</Box>
        </Stack>
        <Stack direction="row" justify="end" gap={2}>
          <Box>Cancel</Box>
          <Box>Submit</Box>
        </Stack>
      </Stack>
    </div>
  ),
}

// Sidebar-like layout
export const SidebarLayout: Story = {
  render: () => (
    <div className="h-[400px] w-[200px] bg-gray-100">
      <Stack gap={2} padding={4}>
        <Box>Dashboard</Box>
        <Box>Profile</Box>
        <Box>Settings</Box>
        <Stack flex={1} />
        <Box>Logout</Box>
      </Stack>
    </div>
  ),
}

// Center content both vertically and horizontally
export const CenteredContent: Story = {
  render: () => (
    <div className="h-[300px] w-[300px] bg-gray-100">
      <Stack align="center" justify="center" gap={2}>
        <Box>Centered</Box>
        <Box>Content</Box>
      </Stack>
    </div>
  ),
}

// Responsive grid-like layout with wrapping
export const GridLayout: Story = {
  render: () => (
    <div className="w-[400px] bg-gray-100">
      <Stack direction="row" wrap="wrap" gap={2} padding={4}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
      </Stack>
    </div>
  ),
}
