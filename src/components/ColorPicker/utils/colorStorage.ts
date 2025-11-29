/**
 * ChromaForge Pro - Color Collections Manager
 * localStorage-based color template/collection system
 */

import type { ColorState } from '../types';

export interface ColorCollection {
  id: string;
  name: string;
  colors: ColorState[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'chromaforge_collections';
const HISTORY_KEY = 'chromaforge_history';
const MAX_HISTORY = 50;

/**
 * Get all saved collections
 */
export function getCollections(): ColorCollection[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load collections:', error);
    return [];
  }
}

/**
 * Save a new collection
 */
export function saveCollection(name: string, colors: ColorState[]): ColorCollection {
  const collections = getCollections();
  const newCollection: ColorCollection = {
    id: Date.now().toString(),
    name,
    colors,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  collections.push(newCollection);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
  } catch (error) {
    console.error('Failed to save collection:', error);
  }

  return newCollection;
}

/**
 * Update an existing collection
 */
export function updateCollection(id: string, name: string, colors: ColorState[]): void {
  const collections = getCollections();
  const index = collections.findIndex((c) => c.id === id);

  if (index !== -1) {
    collections[index] = {
      ...collections[index],
      name,
      colors,
      updatedAt: Date.now(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    } catch (error) {
      console.error('Failed to update collection:', error);
    }
  }
}

/**
 * Delete a collection
 */
export function deleteCollection(id: string): void {
  const collections = getCollections().filter((c) => c.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
  } catch (error) {
    console.error('Failed to delete collection:', error);
  }
}

/**
 * Add color to history
 */
export function addToHistory(color: ColorState): void {
  try {
    const historyData = localStorage.getItem(HISTORY_KEY);
    const history: ColorState[] = historyData ? JSON.parse(historyData) : [];

    // Don't add duplicates
    const exists = history.some((c) => c.hex === color.hex);
    if (exists) return;

    // Add to beginning
    history.unshift(color);

    // Keep only MAX_HISTORY items
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to add to history:', error);
  }
}

/**
 * Get color history
 */
export function getHistory(): ColorState[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

/**
 * Clear history
 */
export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}
