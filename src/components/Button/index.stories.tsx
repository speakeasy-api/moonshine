import { Meta, StoryObj } from '@storybook/react/*'
import { Button, ButtonProps } from './'
import { PlusIcon as LucidePlusIcon, ChevronRight } from 'lucide-react'
import { fn as storybookActionFn } from '@storybook/test'

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        // New variants
        'brand',
        'primary',
        'secondary',
        'tertiary',
        'destructive-primary',
        'destructive-secondary',
        // Deprecated variants
        'default',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    context: {
      control: { type: 'select' },
      options: ['product', 'marketing'],
      description:
        'Context determines styling - product uses rounded corners, marketing uses full pills',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

const baseProps: Partial<ButtonProps> = {
  onClick: storybookActionFn(),
}

// === NEW VARIANTS ===

export const Brand: Story = {
  args: {
    ...baseProps,
    children: 'Brand Button',
    variant: 'brand',
    context: 'product',
  },
}

export const BrandMarketing: Story = {
  args: {
    ...baseProps,
    children: 'Brand Marketing',
    variant: 'brand',
    context: 'marketing',
  },
}

export const Primary: Story = {
  args: {
    ...baseProps,
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    ...baseProps,
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    ...baseProps,
    children: 'Tertiary Button',
    variant: 'tertiary',
  },
}

export const DestructivePrimary: Story = {
  args: {
    ...baseProps,
    children: 'Delete',
    variant: 'destructive-primary',
  },
}

export const DestructiveSecondary: Story = {
  args: {
    ...baseProps,
    children: 'Delete',
    variant: 'destructive-secondary',
  },
}

export const WithLeftIcon: Story = {
  args: {
    ...Primary.args,
    children: (
      <>
        <Button.LeftIcon>
          <PlusIcon />
        </Button.LeftIcon>
        <Button.Text>Add Item</Button.Text>
      </>
    ),
  },
}

export const WithBothIcons: Story = {
  args: {
    ...Primary.args,
    children: (
      <>
        <Button.LeftIcon>
          <PlusIcon />
        </Button.LeftIcon>
        <Button.Text>Continue</Button.Text>
        <Button.RightIcon>
          <ChevronRight />
        </Button.RightIcon>
      </>
    ),
  },
}

export const WithRightIcon: Story = {
  args: {
    ...Primary.args,
    children: (
      <>
        <Button.Text>Next</Button.Text>
        <Button.RightIcon>
          <ChevronRight />
        </Button.RightIcon>
      </>
    ),
  },
}

// Migration guide
export const ValidationExamples: Story = {
  name: 'API Validation (Check Console)',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">✅ Correct Usage</h3>
        <div className="flex gap-2">
          <Button variant="primary">
            <Button.LeftIcon>
              <PlusIcon />
            </Button.LeftIcon>
            <Button.Text>Explicit Structure</Button.Text>
          </Button>
          <Button variant="primary">Raw text (auto-wrapped)</Button>
        </div>
        <p className="text-muted mt-2 text-xs">
          Raw text is automatically wrapped in Button.Text, similar to native
          HTML buttons.
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">
          ⚠️ Validation Warnings (Check Console)
        </h3>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Button.LeftIcon>
              <PlusIcon />
            </Button.LeftIcon>
            <span>Custom span element</span>
          </Button>
          <Button variant="secondary">
            <Button.LeftIcon>
              <PlusIcon />
            </Button.LeftIcon>
            <div>No text or aria-label</div>
          </Button>
        </div>
        <p className="text-muted mt-2 text-xs">
          These buttons use invalid child types and will show warnings in the
          console.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The Button component validates proper usage in development mode, warning about missing accessibility attributes and incorrect child structure.',
      },
    },
  },
}

export const IconMigrationGuide: Story = {
  name: 'Icon Usage Guide',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Text + Icon Buttons</h3>
        <div className="flex gap-2">
          <Button variant="primary">
            <Button.LeftIcon>
              <PlusIcon />
            </Button.LeftIcon>
            <Button.Text>Add Item</Button.Text>
          </Button>
          <Button variant="secondary">
            <Button.Text>Continue</Button.Text>
            <Button.RightIcon>
              <ChevronRight />
            </Button.RightIcon>
          </Button>
        </div>
        <p className="text-muted mt-2 text-xs">
          ✅ Use Button with compound components for text + icons
        </p>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Icon-Only Buttons</h3>
        <p className="text-muted text-xs">
          ✅ Use separate IconButton component for icon-only buttons (see
          IconButton stories)
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**Two Components**: Use Button for text/mixed content, IconButton for icon-only buttons.',
      },
    },
  },
}

export const Small: Story = {
  args: {
    ...Primary.args,
    children: 'Small Button',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    ...Primary.args,
    children: 'Large Button',
    size: 'lg',
  },
}

// Wrapper for Lucide PlusIcon that allows us to bypass issue
// where the code snippet would render React.forwardRef instead of <PlusIcon />
function PlusIcon(props: React.ComponentProps<typeof LucidePlusIcon>) {
  return <LucidePlusIcon {...props} />
}

export const AsChild: Story = {
  args: {
    ...Primary.args,
    asChild: true,
    children: <a href="#">Link as Button</a>,
  },
}

// === SIZE VARIANTS ===

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Primary Button Sizes</h3>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="xs">
            Extra Small
          </Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Secondary Button Sizes</h3>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="xs">
            Extra Small
          </Button>
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Brand Button Sizes</h3>
        <div className="flex items-center gap-4">
          <Button variant="brand" size="xs">
            Extra Small
          </Button>
          <Button variant="brand" size="sm">
            Small
          </Button>
          <Button variant="brand" size="md">
            Medium
          </Button>
          <Button variant="brand" size="lg">
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
}

// === BUTTON COMBINATIONS ===

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">New Variants - Product Context</h3>
        <div className="flex gap-2">
          <Button variant="brand" context="product">
            Brand
          </Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive-primary">Delete</Button>
          <Button variant="destructive-secondary">Delete</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">
          New Variants - Marketing Context
        </h3>
        <div className="flex gap-2">
          <Button variant="brand" context="marketing">
            Brand Marketing
          </Button>
          <Button variant="primary" context="marketing">
            Primary
          </Button>
          <Button variant="secondary" context="marketing">
            Secondary
          </Button>
          <Button variant="tertiary" context="marketing">
            Tertiary
          </Button>
        </div>
      </div>
    </div>
  ),
}

export const WithStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="primary">Normal</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary">Normal</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="destructive-primary">Normal</Button>
        <Button variant="destructive-primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
}

// ========================================
// DEPRECATED VARIANTS - FOR MIGRATION ONLY
// ========================================

export const Default: Story = {
  name: '⚠️ Default (Deprecated)',
  args: {
    ...baseProps,
    children: 'Default Button',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '**⚠️ Deprecated**: Use `primary` variant instead.',
      },
    },
  },
}

export const Destructive: Story = {
  name: '⚠️ Destructive (Deprecated)',
  args: {
    ...baseProps,
    children: 'Destructive Button',
    variant: 'destructive',
  },
  parameters: {
    docs: {
      description: {
        story: '**⚠️ Deprecated**: Use `destructive-primary` variant instead.',
      },
    },
  },
}

export const Ghost: Story = {
  name: '⚠️ Ghost (Deprecated)',
  args: {
    ...baseProps,
    children: 'Ghost Button',
    variant: 'ghost',
  },
  parameters: {
    docs: {
      description: {
        story: '**⚠️ Deprecated**: Use `tertiary` variant instead.',
      },
    },
  },
}

export const Link: Story = {
  name: '⚠️ Link (Deprecated)',
  args: {
    ...baseProps,
    children: 'Link Button',
    variant: 'link',
  },
  parameters: {
    docs: {
      description: {
        story: '**⚠️ Deprecated**: Use semantic `<a>` tag instead.',
      },
    },
  },
}

export const Outline: Story = {
  name: '⚠️ Outline (Deprecated)',
  args: {
    ...baseProps,
    children: 'Outline Button',
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story: '**⚠️ Deprecated**: Use `secondary` variant instead.',
      },
    },
  },
}
