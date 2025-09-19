import { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from '.'
import { ModalProvider } from '@/context/ModalContext'
import { useModal } from '@/hooks/useModal'
import { memo, useEffect } from 'react'
import { faker } from '@faker-js/faker'
import { Button, Icon } from '@/index'

faker.seed(123)

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Modal>

const Underlay = memo(() => {
  return (
    <div className="bg-surface-secondary fixed inset-0 flex h-screen w-screen flex-col gap-1 p-20">
      {faker.lorem
        .paragraphs(30, '\n')
        .split('\n')
        .map((paragraph, index) => (
          <p key={index} className="text-body-md">
            {paragraph}
          </p>
        ))}
    </div>
  )
})

const ModalRenderer = ({
  closable = false,
  multiScreen = false,
}: {
  closable?: boolean
  multiScreen?: boolean
}) => {
  const { openScreen, pushScreen } = useModal()

  const addScreen = () => {
    pushScreen({
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 1, max: 3 }),
      component: <div>{faker.lorem.paragraph()}</div>,
    })
  }

  useEffect(() => {
    openScreen({
      id: '1',
      title: 'Lorem ipsum dolor sit amet',
      component: (
        <div className="text-body-md flex flex-col gap-3">
          {faker.lorem
            .paragraphs(3, '\n')
            .split('\n')
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

          {multiScreen && (
            <Button
              variant="secondary"
              size="sm"
              className="w-fit justify-self-end"
              onClick={addScreen}
            >
              <Icon name="plus" />
              Next screen
            </Button>
          )}
        </div>
      ),
    })
  }, [openScreen])

  return (
    <div>
      <Underlay />
      <Modal closable={closable} />
    </div>
  )
}

export const Default: Story = {
  render: () => {
    return (
      <ModalProvider>
        <ModalRenderer />
      </ModalProvider>
    )
  },
}

export const Closable: Story = {
  render: () => {
    return (
      <ModalProvider>
        <ModalRenderer closable />
      </ModalProvider>
    )
  },
}

export const MultiScreen: Story = {
  render: () => {
    return (
      <ModalProvider>
        <ModalRenderer closable={false} multiScreen />
      </ModalProvider>
    )
  },
}
