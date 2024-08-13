import { fn } from '@storybook/test'
import CardComponent from './Card.vue'

export default {
  title: 'Example/Card',
  component: CardComponent,
  tags: ['autodocs'],
  args: { onClick: fn() },
}

export const Card = {
  args: {
    title: 'Card title',
    description: 'Card description goes here',
  },
};
