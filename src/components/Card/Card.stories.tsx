import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Beast Mode GPT',
    meta: 'Autonomous secure React agent',
    description: 'Secure React development agent.',
    iframeSrc: 'https://obsidian-pixel.github.io/beastmodegpt/',
    liveUrl: 'https://obsidian-pixel.github.io/beastmodegpt/',
    stealUrl: 'https://github.com/obsidian-pixel/beastmodegpt',
  }
};