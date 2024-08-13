import { fn } from '@storybook/test'
import CardComponent from './Card.vue'

export default {
  title: 'Example/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    status: { control: { type: 'select' }, options: ['pending', 'inProgress', 'completed'] },
    dueDate: { control: 'text' }
  },
  args: { onClick: fn() },
}

export const Card = {
  args: {
    title: 'Card title',
    description: 'Card description goes here',
  },
};
