# Card

Purpose: Presentational component displaying an embedded preview and action links.

## Props

```ts
type CardProps = {
  title: string;
  meta?: string;
  description: string;
  iframeSrc: string;
  liveUrl: string;
  stealUrl: string;
}
```

## Usage

```tsx
import { Card } from '@/components/Card/Card';

<Card title="Example" description="Sample" iframeSrc="https://..." liveUrl="https://..." stealUrl="https://..." />
```

## Dependencies

- React
- CSS Module `card.module.css`