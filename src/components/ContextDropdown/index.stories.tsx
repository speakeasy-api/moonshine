import { Meta, StoryObj } from '@storybook/react'
import { ContextDropdown } from '.'
import { useModal } from '../../hooks/useModal'
import { Button } from '../Button'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { ModalProvider } from '@/context/ModalContext'
import { faker } from '@faker-js/faker'
import { cn } from '@/lib/utils'
import { Heading } from '../Heading'
import { Text } from '../Text'

faker.seed(123)

const meta: Meta<typeof ContextDropdown> = {
  component: ContextDropdown,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ContextDropdown>

interface ScreenProps {
  title: string
  content: string
  index: number
}

function Screen({ title, content, index }: ScreenProps) {
  const { pushScreen } = useModal()
  const nextIndex = index + 1
  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-4">
      <Heading variant="sm" className="!leading-7">
        {title}
      </Heading>
      <Text>{content}</Text>

      <div className="mt-auto w-full">
        <div className="flex w-full justify-end">
          <Button
            className="ml-auto"
            onClick={() => {
              pushScreen({
                id: index.toString(),
                title: `Screen ${nextIndex}`,
                component: (
                  <Screen
                    title={faker.lorem.sentence({ min: 1, max: 3 })}
                    content={faker.lorem.paragraph({ min: 1, max: 3 })}
                    index={nextIndex}
                  />
                ),
              })
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => {
    return (
      <ModalProvider>
        {({ isOpen, openScreen }) => (
          <Popover open={isOpen}>
            <PopoverTrigger asChild>
              <Button
                onClick={() =>
                  openScreen({
                    id: '1',
                    title: 'Screen 1',
                    component: (
                      <Screen
                        title={faker.lorem.sentence({ min: 1, max: 3 })}
                        content={faker.lorem.paragraph({ min: 1, max: 3 })}
                        index={1}
                      />
                    ),
                  })
                }
              >
                Open dropdown
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={10}
              className="shadow-foreground/10 min-h-80 w-full min-w-lg overflow-hidden shadow-lg"
            >
              <ContextDropdown />
            </PopoverContent>
          </Popover>
        )}
      </ModalProvider>
    )
  },
}

export const CustomTitle: Story = {
  render: () => {
    return (
      <ModalProvider>
        {({ isOpen, openScreen }) => (
          <Popover open={isOpen}>
            <PopoverTrigger asChild>
              <Button
                onClick={() =>
                  openScreen({
                    id: '1',
                    title: 'Screen 1',
                    component: (
                      <Screen
                        title={faker.lorem.sentence()}
                        content={faker.lorem.paragraph()}
                        index={1}
                      />
                    ),
                  })
                }
              >
                Open dropdown
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={10}
              className="shadow-foreground/10 flex h-auto w-full min-w-lg flex-col shadow-lg"
            >
              <ContextDropdown
                renderTitle={(screen, index) => (
                  <div
                    className={cn(
                      'text-md absolute font-medium',
                      index % 2 === 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-indigo-600 dark:text-indigo-400'
                    )}
                  >
                    {screen.title}
                  </div>
                )}
              />
            </PopoverContent>
          </Popover>
        )}
      </ModalProvider>
    )
  },
}
