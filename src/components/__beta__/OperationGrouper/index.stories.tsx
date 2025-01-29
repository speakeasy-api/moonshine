import { useState } from 'react'
import { Group, Operation, OperationGrouper, OperationGrouperProps } from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof OperationGrouper> = {
  component: OperationGrouper,
}

export default meta

type Story = StoryObj<typeof OperationGrouper>

const OperationGrouperWithState = ({
  groups: initialGroups,
}: Pick<OperationGrouperProps, 'groups'>) => {
  const [groups, setGroups] = useState<Group[]>(initialGroups)

  const handleItemMove = (
    operation: Operation,
    originalGroup: Group,
    newGroup: Group
  ) => {
    const hasMoved = originalGroup.id !== newGroup.id
    setGroups(
      groups.map((group) => {
        if (hasMoved && group.id === originalGroup.id) {
          return {
            ...group,
            operations: group.operations.filter((o) => o.id !== operation.id),
          }
        } else if (hasMoved && group.id === newGroup.id) {
          return {
            ...group,
            operations: [...group.operations, operation],
          }
        }
        return group
      })
    )
  }

  return <OperationGrouper groups={groups} onItemMove={handleItemMove} />
}

const initialGroups: Group[] = [
  {
    id: '1',
    name: 'orders',
    color: 'rgba(229, 180, 42, 0.9)',
    operations: [
      {
        id: 'a',
        name: 'getOrders',
        path: '$.paths.orders.get',
      },
      {
        id: 'b',
        name: 'createOrder',
        path: '$.paths.orders.post',
      },
      {
        id: 'c',
        name: 'createOrderFulfillment',
        path: '$.paths.orders.post.responses.200.content.application/json.schema.properties.fulfillment',
      },
    ],
    path: '$.paths.orders',
  },
  {
    id: '2',
    name: 'fulfillments',
    color: 'rgba(79, 59, 195, 0.9)',
    operations: [
      {
        id: 'd',
        name: 'getFulfillments',
        path: '$.paths.fulfillments.get',
      },
    ],
    path: '$.paths.fulfillments',
  },
  {
    id: '3',
    name: 'products',
    color: 'rgba(100, 80, 95, 0.9)',
    operations: [
      {
        id: 'e',
        name: 'getProducts',
        path: '$.paths.products.get',
      },
    ],
    path: '$.paths.products',
  },
]

export const Primary: Story = {
  args: {
    groups: initialGroups,
  },
  render: (args) => {
    return <OperationGrouperWithState {...args} />
  },
}
