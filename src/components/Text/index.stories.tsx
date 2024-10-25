import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '.'
import { Stack } from '../Stack'

const meta: Meta<typeof Text> = {
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    children: 'Default text example',
    variant: 'p',
  },
}

export const AllVariants: Story = {
  render: () => (
    <Stack gap={2}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="p">Paragraph text</Text>
      <Text variant="blockquote">Blockquote text</Text>
      <Text variant="list">
        <li>List item 1</li>
        <li>List item 2</li>
      </Text>
      <Text variant="inlineCode">Inline code</Text>
      <Text variant="lead">Lead text</Text>
      <Text variant="large">Large text</Text>
      <Text variant="small">Small text</Text>
      <Text variant="muted">Muted text</Text>
    </Stack>
  ),
}

export const Heading1: Story = {
  args: { variant: 'h1', children: 'Heading 1' },
}
export const Heading2: Story = {
  args: { variant: 'h2', children: 'Heading 2' },
}
export const Heading3: Story = {
  args: { variant: 'h3', children: 'Heading 3' },
}
export const Heading4: Story = {
  args: { variant: 'h4', children: 'Heading 4' },
}
export const Paragraph: Story = {
  args: { variant: 'p', children: 'Paragraph text' },
}
export const Blockquote: Story = {
  args: { variant: 'blockquote', children: 'Blockquote text' },
}
export const List: Story = {
  args: {
    variant: 'list',
    children: (
      <>
        <li>List item 1</li>
        <li>List item 2</li>
      </>
    ),
  },
}
export const InlineCode: Story = {
  args: { variant: 'inlineCode', children: 'Inline code' },
}
export const Lead: Story = { args: { variant: 'lead', children: 'Lead text' } }
export const Large: Story = {
  args: { variant: 'large', children: 'Large text' },
}
export const Small: Story = {
  args: { variant: 'small', children: 'Small text' },
}
export const Muted: Story = {
  args: { variant: 'muted', children: 'Muted text' },
}

export const VariantWithAs: Story = {
  render: () => (
    <Stack gap={2}>
      <Text as="h1" variant="p">
        Paragraph styled as H1
      </Text>
      <Text as="p" variant="h1">
        H1 styled as paragraph
      </Text>
      <Text as="span" variant="blockquote">
        Blockquote as span
      </Text>
    </Stack>
  ),
}

export const RichText: Story = {
  render: () => (
    <Stack gap={2}>
      <Text>
        This text includes <strong>bold</strong>, <em>italic</em>,{' '}
        <s>strikethrough</s>, and <u>underlined</u> elements.
      </Text>
    </Stack>
  ),
}

export const Truncate: Story = {
  render: () => (
    <Stack gap={2}>
      <Text truncate>
        This is an example of truncated text that will be cut off if it exceeds
        one line. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text truncate={2}>
        This text will be truncated after two lines. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
        interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod
        nunc.
      </Text>
      <Text truncate={3}>
        This text will be truncated after three lines. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
        interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod
        nunc. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </Stack>
  ),
}

export const Alignment: Story = {
  render: () => (
    <Stack gap={2}>
      <Text align="left">This text is left aligned</Text>
      <Text align="center">This text is center aligned</Text>
      <Text align="right">This text is right aligned</Text>
    </Stack>
  ),
}

export const Transform: Story = {
  render: () => (
    <Stack gap={2}>
      <Text transform="uppercase">This text is uppercase</Text>
      <Text transform="lowercase">This Text Is Lowercase</Text>
      <Text transform="capitalize">this text is capitalized</Text>
      <Text transform="none">This text has no transform</Text>
    </Stack>
  ),
}

export const AlignAndTransform: Story = {
  render: () => (
    <Stack gap={2}>
      <Text align="center" transform="uppercase">
        Centered Uppercase Text
      </Text>
      <Text align="right" transform="lowercase">
        Right-aligned Lowercase Text
      </Text>
      <Text align="left" transform="capitalize">
        Left-aligned Capitalized Text
      </Text>
    </Stack>
  ),
}

export const FontStyles: Story = {
  render: () => (
    <Stack gap={2}>
      <Text>This is in the default font</Text>
      <Text monospace>This is in a monospace font</Text>
    </Stack>
  ),
}

export const NestedText: Story = {
  render: () => (
    <Text variant="p">
      This is a paragraph with <Text variant="inlineCode">inline code</Text> and{' '}
      <Text variant="small">small text</Text> nested inside it.
    </Text>
  ),
}
