# SearchBar

Purpose: Controlled input for filtering builds.

## Props

- `onSearch(value: string)`: callback with sanitized input.

## Usage

```tsx
import { SearchBar } from '@/components/SearchBar/Search-Bar';

<SearchBar onSearch={(v) => console.log(v)} />
```

## Dependencies

- React
- CSS Module `search-bar.module.css`