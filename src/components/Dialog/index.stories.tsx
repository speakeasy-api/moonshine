import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Button } from '../Button'

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  args: {
    children: [
      <DialogTrigger asChild>
        <Button variant="outline">Delete Account</Button>
      </DialogTrigger>,
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Delete</Button>
        </DialogFooter>
      </DialogContent>,
    ],
  },
}
