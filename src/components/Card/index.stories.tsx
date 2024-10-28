import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: [
      <Card.Header key="header">This is a card title</Card.Header>,
      <Card.Content key="content">
        Lorem ipsum dolor sit amet consectetur adipiscing elit, parturient
        tellus quam odio mollis. Vel placerat massa fermentum commodo tellus
        congue primis euismod porta, senectus mi sagittis morbi posuere aliquet
        turpis habitant neque, non tempor ac cubilia malesuada condimentum diam
        eget. Elementum iaculis himenaeos varius orci nulla fames dis conubia
        dui, lobortis auctor mi dignissim lectus est vulputate ornare platea,
        pellentesque purus curabitur penatibus placerat suspendisse vehicula
        rutrum.
      </Card.Content>,
      <Card.Footer key="footer">Footer</Card.Footer>,
    ],
  },
}

export const WithNoHeader: Story = {
  args: {
    ...Default.args,
    children: [
      <Card.Content key="content">
        Lorem ipsum dolor sit amet consectetur adipiscing elit, parturient
        tellus quam odio mollis. Vel placerat massa fermentum commodo tellus
        congue primis euismod porta, senectus mi sagittis morbi posuere aliquet
        turpis habitant neque, non tempor ac cubilia malesuada condimentum diam
        eget. Elementum iaculis himenaeos varius orci nulla fames dis conubia
        dui, lobortis auctor mi dignissim lectus est vulputate ornare platea,
        pellentesque purus curabitur penatibus placerat suspendisse vehicula
        rutrum.
      </Card.Content>,
      <Card.Footer key="footer">Footer</Card.Footer>,
    ],
  },
}

export const WithNoFooter: Story = {
  args: {
    ...WithNoHeader.args,
    children: [
      <Card.Header key="header">This is a card title</Card.Header>,
      <Card.Content key="content">
        Lorem ipsum dolor sit amet consectetur adipiscing elit, parturient
        tellus quam odio mollis. Vel placerat massa fermentum commodo tellus
        congue primis euismod porta, senectus mi sagittis morbi posuere aliquet
        turpis habitant neque, non tempor ac cubilia malesuada condimentum diam
        eget. Elementum iaculis himenaeos varius orci nulla fames dis conubia
        dui, lobortis auctor mi dignissim lectus est vulputate ornare platea,
        pellentesque purus curabitur penatibus placerat suspendisse vehicula
        rutrum.
      </Card.Content>,
    ],
  },
}

export const WithInvalidChildren: Story = {
  args: {
    ...Default.args,
    children: [
      <Card.Header key="header">
        Card will not accept invalid children
      </Card.Header>,
      <Card.Content key="content">
        The Card component has a guardrail which prevents any React children
        from being rendered which are not one of:
        <ul className="mt-2 list-disc pl-4">
          <li>
            <code className="font-mono text-sm text-blue-500">Card.Header</code>
          </li>
          <li>
            <code className="font-mono text-sm text-blue-500">
              Card.Content
            </code>
          </li>
          <li>
            <code className="font-mono text-sm text-blue-500">Card.Footer</code>
          </li>
        </ul>
      </Card.Content>,
      <div key="invalid">Won't be rendered</div>,
    ],
  },
}
