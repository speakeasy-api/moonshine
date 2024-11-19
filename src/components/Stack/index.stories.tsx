import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '.'
import { createSampleChildren } from '@/lib/storybookUtils'
import { alignmentOptions, directionOptions, packOptions } from '@/types'

const meta: Meta<typeof Stack> = {
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: alignmentOptions,
    },
    mainAxisAlign: {
      control: 'select',
      options: packOptions,
    },
    direction: {
      control: 'select',
      options: directionOptions,
    },
    gap: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  args: {
    children: createSampleChildren(3),
    gap: 0,
  },
}

export const WithCustomGap: Story = {
  args: {
    ...Default.args,
    gap: 5,
  },
}

export const RowDirection: Story = {
  args: {
    ...Default.args,
    direction: 'row',
  },
}

export const ResponsiveDirection: Story = {
  args: {
    ...Default.args,
    direction: { sm: 'column', md: 'row' },
  },
}

export const ResponsiveGap: Story = {
  args: {
    ...Default.args,
    gap: { sm: 2, md: 5, lg: 10, xl: 12 },
  },
}

export const Padding: Story = {
  args: {
    ...Default.args,
    padding: 2,
  },
}

export const ResponsivePadding: Story = {
  args: {
    ...Default.args,
    padding: { sm: 2, md: 4, lg: 6, xl: 8 },
  },
}

export const PaddingPerSide: Story = {
  args: {
    ...Default.args,
    padding: { top: 12, right: 0, bottom: 12, left: 0 },
  },
}

export const ResponsivePaddingPerSide: Story = {
  args: {
    ...Default.args,
    padding: { sm: 0, md: 0, lg: 0, xl: { x: 10, y: 12 } },
  },
}

export const PackedStart = {
  args: {
    ...Default.args,
    direction: 'row',
    spacing: 'packed',
    mainAxisAlign: 'start',
  },
}

export const PackedCenter = {
  args: {
    ...Default.args,
    direction: 'row',
    spacing: 'packed',
    mainAxisAlign: 'center',
  },
}

export const PackedEnd = {
  args: {
    ...Default.args,
    direction: 'row',
    spacing: 'packed',
    mainAxisAlign: 'end',
  },
}

export const PackedWithGap = {
  args: {
    ...Default.args,
    direction: 'row',
    spacing: 'packed',
    mainAxisAlign: 'center',
    gap: 4,
  },
}

export const SpaceEvenly = {
  args: {
    ...Default.args,
    direction: 'row',
    spacing: 'spaceEvenly',
    gap: 0,
  },
}

export const SpaceAround = {
  args: {
    ...Default.args,
    direction: 'row',
    spacing: 'spaceAround',
    gap: 0,
  },
}

export const StretchInRow: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: '200px', border: '1px solid #666' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    direction: 'row',
    gap: 2,
    stretch: true,
    children: [
      <div
        key="1"
        style={{ background: '#ddd', padding: '8px', height: '100%' }}
      >
        Short content
      </div>,
      <div
        key="2"
        style={{ background: '#ddd', padding: '8px', height: '100%' }}
      >
        This item has more content so it's taller
        <br />
        Multiple lines
      </div>,
      <div
        key="3"
        style={{ background: '#ddd', padding: '8px', height: '100%' }}
      >
        Short content
      </div>,
    ],
  },
}

export const StretchInColumn: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '400px', border: '1px solid #666' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    direction: 'column',
    gap: 2,
    stretch: true,
    children: [
      <div
        key="1"
        style={{ background: '#ddd', padding: '8px', width: '100%' }}
      >
        Narrow content
      </div>,
      <div
        key="2"
        style={{ background: '#ddd', padding: '8px', width: '100%' }}
      >
        This item has more content so it's wider than others
      </div>,
      <div
        key="3"
        style={{ background: '#ddd', padding: '8px', width: '100%' }}
      >
        Narrow content
      </div>,
    ],
  },
}

export const StretchWithAlignment: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: '200px', border: '1px solid #666' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    direction: 'row',
    gap: 2,
    stretch: true,
    align: 'center',
    children: [
      <div
        key="1"
        style={{
          background: '#ddd',
          padding: '8px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Short
      </div>,
      <div
        key="2"
        style={{
          background: '#ddd',
          padding: '8px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        This item has
        <br />
        multiple lines
        <br />
        of content
      </div>,
      <div
        key="3"
        style={{
          background: '#ddd',
          padding: '8px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Short
      </div>,
    ],
  },
}

export const ResponsiveSpacing = {
  args: {
    ...Default.args,
    direction: 'row',
    spacing: {
      sm: 'packed',
      md: 'spaceBetween',
      lg: 'spaceEvenly',
    },
    mainAxisAlign: 'center',
  },
}

export const ResponsiveAlign: Story = {
  args: {
    ...Default.args,
    direction: 'column',
    align: { sm: 'start', md: 'center', lg: 'end' },
  },
}

export const NavigationBar: Story = {
  args: {
    direction: 'row',
    spacing: 'spaceBetween',
    padding: { x: 4, y: 2 },
    align: 'center',
    children: [
      <div key="logo">Logo</div>,
      <Stack key="nav-items" direction="row" gap={4}>
        {['Home', 'Products', 'About', 'Contact'].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </Stack>,
      <div key="actions">Sign In</div>,
    ],
  },
}

export const FormLayout: Story = {
  args: {
    direction: 'column',
    gap: 4,
    children: [
      <Stack key="name-field" direction="column" gap={1}>
        <div>Name</div>
        <div>Input field</div>
      </Stack>,
      <Stack key="email-field" direction="column" gap={1}>
        <div>Email</div>
        <div>Input field</div>
      </Stack>,
      <Stack
        key="actions"
        direction="row"
        spacing="packed"
        mainAxisAlign="end"
        gap={2}
      >
        <div>Cancel</div>
        <div>Submit</div>
      </Stack>,
    ],
  },
}

export const CardLayout: Story = {
  args: {
    direction: 'column',
    gap: 4,
    padding: 4,
    children: [
      <Stack key="header" direction="row" spacing="spaceBetween" align="center">
        <div>Card Title</div>
        <div>⋮</div>
      </Stack>,
      <div key="content">Main content goes here...</div>,
      <Stack
        key="footer"
        direction="row"
        spacing="packed"
        mainAxisAlign="end"
        gap={2}
      >
        <div>Cancel</div>
        <div>Save</div>
      </Stack>,
    ],
  },
}

export const DialogLayout: Story = {
  args: {
    direction: 'column',
    gap: 4,
    padding: 4,
    children: [
      <Stack key="header" direction="row" spacing="spaceBetween" align="center">
        <div>Dialog Title</div>
        <div>✕</div>
      </Stack>,
      <Stack key="content" direction="column" gap={2}>
        <div>Dialog content goes here...</div>
        <div>More content...</div>
      </Stack>,
      <Stack
        key="footer"
        direction="row"
        spacing="packed"
        mainAxisAlign="end"
        gap={2}
      >
        <div>Cancel</div>
        <div>Confirm</div>
      </Stack>,
    ],
  },
}

export const MediaWithContent: Story = {
  args: {
    direction: 'row',
    gap: 4,
    align: 'start',
    children: [
      <div key="media" style={{ width: 100, height: 100, background: '#ddd' }}>
        Image
      </div>,
      <Stack key="content" direction="column" gap={2}>
        <div>Title</div>
        <div>Description text goes here...</div>
        <Stack direction="row" gap={2}>
          <div>Tag 1</div>
          <div>Tag 2</div>
        </Stack>
      </Stack>,
    ],
  },
}

export const NestedResponsiveLayout: Story = {
  args: {
    direction: { sm: 'column', md: 'row' },
    gap: { sm: 2, md: 4 },
    align: 'stretch',
    children: [
      <Stack key="sidebar" direction="column" gap={2} padding={2}>
        <div>Sidebar Item 1</div>
        <div>Sidebar Item 2</div>
      </Stack>,
      <Stack key="main" direction="column" gap={4} padding={4}>
        <div>Main Content</div>
        <Stack direction="row" spacing="spaceBetween">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Stack>
      </Stack>,
    ],
  },
}

export const WrapItems: Story = {
  args: {
    direction: 'row',
    gap: 2,
    wrap: 'wrap',
    children: Array.from({ length: 10 }, (_, i) => (
      <div
        key={i}
        style={{
          background: '#ddd',
          padding: '16px',
          width: '150px',
        }}
      >
        Item {i + 1}
      </div>
    )),
  },
}

export const WrapReverse: Story = {
  args: {
    ...WrapItems.args,
    wrap: 'wrap-reverse',
  },
}

export const ResponsiveWrap: Story = {
  args: {
    direction: 'row',
    wrap: { sm: 'wrap', md: 'nowrap' },
    gap: { sm: 2, md: 4 },
    children: Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        style={{
          background: '#ddd',
          padding: '16px',
          minWidth: '120px',
          flex: 1,
        }}
      >
        Navigation Item {i + 1}
      </div>
    )),
  },
}

export const WrapWithAlignment: Story = {
  args: {
    ...WrapItems.args,
    align: 'center',
    children: Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        style={{
          background: '#ddd',
          padding: '16px',
          width: '150px',
          height: i % 2 === 0 ? '80px' : '120px', // Alternate heights
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Item {i + 1}
      </div>
    )),
  },
}

export const Breadcrumbs: Story = {
  args: {
    direction: 'row',
    gap: 2,
    align: 'center',
    children: [
      <div key="home">Home</div>,
      <div key="separator1">/</div>,
      <div key="products">Products</div>,
      <div key="separator2">/</div>,
      <div key="category">Electronics</div>,
      <div key="separator3">/</div>,
      <div key="current" style={{ color: '#666' }}>
        Laptops
      </div>,
    ],
  },
}

export const Pagination: Story = {
  args: {
    direction: 'row',
    gap: 2,
    align: 'center',
    children: [
      <button key="prev" style={{ padding: '8px 16px', background: '#f0f0f0' }}>
        Previous
      </button>,
      <Stack key="pages" direction="row" gap={1}>
        {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
          <div
            key={i}
            style={{
              padding: '8px 12px',
              background: page === 1 ? '#333' : '#f0f0f0',
              color: page === 1 ? 'white' : 'inherit',
              borderRadius: '4px',
            }}
          >
            {page}
          </div>
        ))}
      </Stack>,
      <button key="next" style={{ padding: '8px 16px', background: '#f0f0f0' }}>
        Next
      </button>,
    ],
  },
}

export const FooterLayout: Story = {
  args: {
    direction: { sm: 'column', md: 'row' },
    spacing: 'spaceBetween',
    padding: { x: 6, y: 8 },
    gap: { sm: 8, md: 4 },
    children: [
      <Stack key="company" direction="column" gap={4}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Company</div>
        <Stack direction="column" gap={2}>
          <div>About Us</div>
          <div>Careers</div>
          <div>Press</div>
        </Stack>
      </Stack>,
      <Stack key="resources" direction="column" gap={4}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Resources</div>
        <Stack direction="column" gap={2}>
          <div>Blog</div>
          <div>Documentation</div>
          <div>Help Center</div>
        </Stack>
      </Stack>,
      <Stack key="legal" direction="column" gap={4}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Legal</div>
        <Stack direction="column" gap={2}>
          <div>Privacy</div>
          <div>Terms</div>
          <div>Security</div>
        </Stack>
      </Stack>,
      <Stack key="newsletter" direction="column" gap={4}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Newsletter</div>
        <Stack direction="column" gap={2}>
          <div>Subscribe to our newsletter</div>
          <Stack direction="row" gap={2}>
            <div style={{ padding: '8px', background: '#f0f0f0', flex: 1 }}>
              Email input
            </div>
            <button
              style={{
                padding: '8px 16px',
                background: '#333',
                color: 'white',
              }}
            >
              Subscribe
            </button>
          </Stack>
        </Stack>
      </Stack>,
    ],
  },
}

export const SidebarNavigation: Story = {
  decorators: [
    (Story) => (
      <div
        style={{ width: '240px', height: '400px', border: '1px solid #eee' }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    direction: 'column',
    padding: 2,
    gap: 1,
    children: [
      <Stack key="user" direction="row" gap={3} padding={2} align="center">
        <div
          style={{
            width: '32px',
            height: '32px',
            background: '#ddd',
            borderRadius: '16px',
          }}
        />
        <Stack direction="column" gap={0}>
          <div style={{ fontWeight: 'bold' }}>John Doe</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>Admin</div>
        </Stack>
      </Stack>,
      <div
        key="divider"
        style={{ height: '1px', background: '#eee', margin: '8px 0' }}
      />,
      ...['Dashboard', 'Analytics', 'Projects', 'Tasks', 'Messages'].map(
        (item) => (
          <div
            key={item}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              background: item === 'Dashboard' ? '#f0f0f0' : 'transparent',
            }}
          >
            {item}
          </div>
        )
      ),
      <div key="spacer" style={{ flex: 1 }} />,
      <Stack key="footer" direction="column" gap={2} padding={2}>
        <div style={{ fontSize: '0.875rem', color: '#666' }}>Settings</div>
        <div style={{ fontSize: '0.875rem', color: '#666' }}>Help</div>
        <div style={{ fontSize: '0.875rem', color: '#666' }}>Logout</div>
      </Stack>,
    ],
  },
}
