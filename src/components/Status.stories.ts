import { fn } from '@storybook/test'
import Status from './Status.vue'

export default {
  title: 'Example/Status',
  component: Status,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Pending = {
  args: {
    status: 'pending'
  }
}

export const InProgress = {
  args: {
    status: 'inProgress'
  }
}

export const Completed = {
  args: {
    status: 'completed'
  }
}
