import type { Meta, StoryObj } from '@storybook/react-vite'
import { AnimatedLogo } from './Animated'

const meta: Meta<typeof AnimatedLogo> = {
  component: AnimatedLogo,
  tags: ['autodocs'],
  title: 'components/Logo/Animated',
}

export default meta

type Story = StoryObj<typeof AnimatedLogo>

export const Default: Story = {}

export const DefaultWithWordmark: Story = {
  args: {
    variant: 'icon-with-wordmark',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
}

export const Wordmark: Story = {
  args: {
    size: 'xl',
    variant: 'icon-with-wordmark',
  },
}

const VariantPreview = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="flex min-h-20 flex-col gap-4">
    <h3 className="text-muted-foreground border-b pb-2 text-sm font-medium">
      {title}
    </h3>
    {children}
  </div>
)

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-row justify-between p-6">
      <div className="flex flex-col gap-4">
        <h2 className="my-4 text-xl font-semibold">Size variants</h2>
        <VariantPreview title="Default (md)">
          <AnimatedLogo />
        </VariantPreview>

        <VariantPreview title="Small (sm)">
          <AnimatedLogo size="sm" />
        </VariantPreview>

        <VariantPreview title="Medium (md)">
          <AnimatedLogo size="md" />
        </VariantPreview>

        <VariantPreview title="Large (lg)">
          <AnimatedLogo size="lg" />
        </VariantPreview>

        <VariantPreview title="Extra Large (xl)">
          <AnimatedLogo size="xl" />
        </VariantPreview>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="my-4 text-xl font-semibold">Wordmark variants</h2>
        <VariantPreview title="Default (md)">
          <AnimatedLogo size="md" variant="icon-with-wordmark" />
        </VariantPreview>

        <VariantPreview title="Small (sm)">
          <AnimatedLogo size="sm" variant="icon-with-wordmark" />
        </VariantPreview>

        <VariantPreview title="Medium (md)">
          <AnimatedLogo size="md" variant="icon-with-wordmark" />
        </VariantPreview>

        <VariantPreview title="Large (lg)">
          <AnimatedLogo size="lg" variant="icon-with-wordmark" />
        </VariantPreview>

        <VariantPreview title="Extra Large (xl)">
          <AnimatedLogo size="xl" variant="icon-with-wordmark" />
        </VariantPreview>
      </div>
    </div>
  ),
}

export const DifferentBackgroundColor: Story = {
  render: () => (
    <div className="flex flex-col gap-3 rounded-lg bg-zinc-200 p-4 dark:bg-zinc-800">
      <p>Icon with wordmark:</p>
      <AnimatedLogo variant="icon-with-wordmark" />

      <p>Icon only:</p>
      <AnimatedLogo variant="icon" />
    </div>
  ),
}
