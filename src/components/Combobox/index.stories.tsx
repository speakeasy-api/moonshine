import type { Meta, StoryObj } from '@storybook/react'
import { Combobox, ComboboxProps } from './index'
import { useState } from 'react'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Combobox>

// Example data
const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix', disabled: true },
  { value: 'astro', label: 'Astro' },
]

const groupedFrameworks = [
  {
    label: 'React Based',
    options: [
      { value: 'next.js', label: 'Next.js' },
      { value: 'remix', label: 'Remix', disabled: true },
      { value: 'gatsby', label: 'Gatsby' },
    ],
  },
  {
    label: 'Vue Based',
    options: [
      { value: 'nuxt.js', label: 'Nuxt.js' },
      { value: 'vuejs', label: 'Vue.js' },
    ],
  },
  {
    label: 'Others',
    options: [
      { value: 'sveltekit', label: 'SvelteKit' },
      { value: 'astro', label: 'Astro' },
    ],
  },
]

// Helpers for generating test data
const generateList = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    value: `item-${i}`,
    label: `Item ${i + 1}`,
  }))

const generateGroupedList = (groupCount: number, itemsPerGroup: number) =>
  Array.from({ length: groupCount }, (_, groupIndex) => ({
    label: `Group ${groupIndex + 1}`,
    options: Array.from({ length: itemsPerGroup }, (_, itemIndex) => ({
      value: `group-${groupIndex}-item-${itemIndex}`,
      label: `Group ${groupIndex + 1} - Item ${itemIndex + 1}`,
    })),
  }))

const Wrapper = (args: ComboboxProps) => {
  const [value, setValue] = useState<string | undefined>()
  if (value) {
    return <Combobox {...args} value={value} onValueChange={setValue} />
  } else {
    return <Combobox {...args} onValueChange={setValue} />
  }
}

// Basic Usage
export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
  },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>()
    if (value) {
      return <Combobox {...args} value={value} onValueChange={setValue} />
    } else {
      return <Combobox {...args} onValueChange={setValue} />
    }
  },
}

export const FixedWidth: Story = {
  args: {
    ...Default.args,
    triggerClassName: 'min-w-[12rem]',
  },
  render: Wrapper,
}

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'next.js',
  },
  render: Wrapper,
}

// Grouped Examples
export const Grouped: Story = {
  args: {
    groups: groupedFrameworks,
    placeholder: 'Select framework...',
  },
  render: Wrapper,
}

export const GroupedWithValue: Story = {
  args: {
    ...Grouped.args,
    value: 'next.js',
  },
  render: Wrapper,
}

// States
export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
  render: Wrapper,
}

export const LoadingWithValue: Story = {
  args: {
    ...WithValue.args,
    loading: true,
  },
  render: Wrapper,
}

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    errorText: 'Failed to load frameworks',
  },
  render: Wrapper,
}

export const Disabled: Story = {
  args: {
    ...WithValue.args,
    disabled: true,
  },
  render: Wrapper,
}

// Variants
export const IconOnly: Story = {
  args: {
    ...Default.args,
    iconOnly: true,
    variant: 'ghost',
  },
  render: Wrapper,
}

export const NonSearchable: Story = {
  args: {
    ...Default.args,
    searchable: false,
  },
  render: Wrapper,
}

// Dynamic Height Examples
export const SmallList: Story = {
  args: {
    options: generateList(3),
    placeholder: 'Small list (3 items)',
  },
  render: Wrapper,
}

export const MediumList: Story = {
  args: {
    options: generateList(8),
    placeholder: 'Medium list (8 items)',
  },
  render: Wrapper,
}

export const LargeList: Story = {
  args: {
    options: generateList(1000),
    placeholder: 'Large list (1000 items)',
  },
  render: Wrapper,
}

export const SmallGroupedList: Story = {
  args: {
    groups: generateGroupedList(2, 2),
    placeholder: 'Small grouped list (4 items)',
  },
  render: Wrapper,
}

export const MediumGroupedList: Story = {
  args: {
    groups: generateGroupedList(3, 3),
    placeholder: 'Medium grouped list (9 items)',
  },
  render: Wrapper,
}

export const LargeGroupedList: Story = {
  args: {
    groups: generateGroupedList(20, 50),
    placeholder: 'Large grouped list (1000 items)',
  },
  render: Wrapper,
}

// Interactive Examples
export const SearchableList: Story = {
  args: {
    options: generateList(1000),
    placeholder: 'Type to filter items...',
    searchPlaceholder: 'Search items...',
  },
  render: Wrapper,
}

export const SearchableGroupedList: Story = {
  args: {
    groups: generateGroupedList(20, 50),
    placeholder: 'Type to filter groups...',
    searchPlaceholder: 'Search groups and items...',
  },
  render: Wrapper,
}
