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
    console.log('originalGroup', originalGroup)
    console.log('newGroup', newGroup)

    setGroups(
      groups.map((group) => {
        if (group.id === originalGroup.id) {
          if (group.id === newGroup.id) {
            return group
          }

          return {
            ...group,
            operations: group.operations.filter((o) => o.id !== operation.id),
          }
        }

        return { ...group, operations: [...group.operations, operation] }
      })
    )
  }

  return <OperationGrouper groups={groups} onItemMove={handleItemMove} />
}

const initialGroups: Group[] = [
  {
    id: '1',
    name: 'orders',
    color: 'red',
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
    color: 'blue',
    operations: [
      {
        id: 'd',
        name: 'getFulfillments',
        path: '$.paths.fulfillments.get',
      },
    ],
    path: '$.paths.fulfillments',
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
