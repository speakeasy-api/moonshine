import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Combobox } from './index'

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

// Basic Usage
export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
  },
}

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'next.js',
  },
}

// Grouped Examples
export const Grouped: Story = {
  args: {
    groups: groupedFrameworks,
    placeholder: 'Select framework...',
  },
}

export const GroupedWithValue: Story = {
  args: {
    ...Grouped.args,
    value: 'next.js',
  },
}

// States
export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
}

export const LoadingWithValue: Story = {
  args: {
    ...WithValue.args,
    loading: true,
  },
}

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    errorText: 'Failed to load frameworks',
  },
}

export const Disabled: Story = {
  args: {
    ...WithValue.args,
    disabled: true,
  },
}

// Variants
export const IconOnly: Story = {
  args: {
    ...Default.args,
    iconOnly: true,
    variant: 'tertiary',
  },
}

export const NonSearchable: Story = {
  args: {
    ...Default.args,
    searchable: false,
  },
}

// Dynamic Height Examples
export const SmallList: Story = {
  args: {
    options: generateList(3),
    placeholder: 'Small list (3 items)',
  },
}

export const MediumList: Story = {
  args: {
    options: generateList(8),
    placeholder: 'Medium list (8 items)',
  },
}

export const LargeList: Story = {
  args: {
    options: generateList(1000),
    placeholder: 'Large list (1000 items)',
  },
}

export const SmallGroupedList: Story = {
  args: {
    groups: generateGroupedList(2, 2),
    placeholder: 'Small grouped list (4 items)',
  },
}

export const MediumGroupedList: Story = {
  args: {
    groups: generateGroupedList(3, 3),
    placeholder: 'Medium grouped list (9 items)',
  },
}

export const LargeGroupedList: Story = {
  args: {
    groups: generateGroupedList(20, 50),
    placeholder: 'Large grouped list (1000 items)',
  },
}

// Interactive Examples
export const SearchableList: Story = {
  args: {
    options: generateList(1000),
    placeholder: 'Type to filter items...',
    searchPlaceholder: 'Search items...',
  },
}

export const SearchableGroupedList: Story = {
  args: {
    groups: generateGroupedList(20, 50),
    placeholder: 'Type to filter groups...',
    searchPlaceholder: 'Search groups and items...',
  },
}

// Create new item example - demonstrates dynamic options
export const WithCreateOption: Story = {
  render: () => {
    const [options, setOptions] = useState(generateList(10))
    const [value, setValue] = useState<string | undefined>()

    return (
      <Combobox
        options={options}
        value={value!}
        onValueChange={setValue}
        placeholder="Search or create..."
        searchPlaceholder="Type to search or create..."
        createOptions={{
          handleCreate: (query) => {
            const newValue = query.toLowerCase().replace(/\s+/g, '-')
            setOptions([...options, { value: newValue, label: query }])
            setValue(newValue)
          },
          renderCreatePrompt: (query) => (
            <span>
              Create <strong>{query}</strong>
            </span>
          ),
        }}
      />
    )
  },
}
