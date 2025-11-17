import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './Search-Bar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    onSearch: () => {}
  }
};