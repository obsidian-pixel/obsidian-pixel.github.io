/// <reference types="react" />
import * as React from 'react';
const { useState, useCallback, memo } = React;
import styles from './search-bar.module.css';

type Props = {
  onSearch: (value: string) => void;
};

export const SearchBar: React.FC<Props> = memo(function SearchBarComponent(props: Props) {
  const { onSearch } = props;
  const [value, setValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[<>]/g, '');
    setValue(v);
    onSearch(v);
  }, [onSearch]);

  const handleSubmit = useCallback(() => onSearch(value), [onSearch, value]);

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  return (
    <div className={styles.searchBar} role="search">
      <label htmlFor="searchInput" className={styles.label}>Search</label>
      <input
        id="searchInput"
        value={value}
        onChange={handleChange}
        onKeyUp={onKeyUp}
        placeholder="> search builds, agents, or code..."
        aria-label="Search builds"
      />
      <button onClick={handleSubmit} aria-label="Submit search">&gt;</button>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;