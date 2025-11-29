/**
 * ChromaForge Pro - Collections Panel
 * Manage saved color collections
 */

import { memo, useState, useEffect } from 'react';
import styles from './CollectionsPanel.module.css';
import type { ColorState } from '../types';
import {
  getCollections,
  saveCollection,
  deleteCollection,
  type ColorCollection,
} from '../utils/colorStorage';

interface CollectionsPanelProps {
  currentColors: ColorState[];
  onLoadCollection: (colors: ColorState[]) => void;
}

export const CollectionsPanel: React.FC<CollectionsPanelProps> = memo(
  ({ currentColors, onLoadCollection }) => {
    const [collections, setCollections] = useState<ColorCollection[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState('');

    useEffect(() => {
      loadCollections();
    }, []);

    const loadCollections = () => {
      setCollections(getCollections());
    };

    const handleSave = () => {
      if (!newName.trim()) return;

      saveCollection(newName.trim(), currentColors);
      setNewName('');
      setIsCreating(false);
      loadCollections();
    };

    const handleDelete = (id: string) => {
      if (confirm('Delete this collection?')) {
        deleteCollection(id);
        loadCollections();
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Saved Collections</h3>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setIsCreating(true)}
            aria-label="Save current palette"
          >
            + Save Current
          </button>
        </div>

        {isCreating && (
          <div className={styles.createForm}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Collection name..."
              className={styles.input}
              maxLength={30}
              autoFocus
            />
            <div className={styles.formActions}>
              <button type="button" onClick={handleSave} className={styles.saveBtn}>
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setNewName('');
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className={styles.list}>
          {collections.length === 0 ? (
            <p className={styles.empty}>No saved collections yet</p>
          ) : (
            collections.map((collection) => (
              <div key={collection.id} className={styles.collection}>
                <div className={styles.collectionInfo}>
                  <strong className={styles.collectionName}>{collection.name}</strong>
                  <span className={styles.collectionCount}>{collection.colors.length} colors</span>
                </div>
                <div className={styles.collectionColors}>
                  {collection.colors.slice(0, 5).map((color, i) => (
                    <div
                      key={i}
                      className={styles.colorDot}
                      style={{ backgroundColor: color.hex }}
                      title={color.hex}
                    />
                  ))}
                </div>
                <div className={styles.collectionActions}>
                  <button
                    type="button"
                    onClick={() => onLoadCollection(collection.colors)}
                    className={styles.loadBtn}
                    aria-label="Load collection"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(collection.id)}
                    className={styles.deleteBtn}
                    aria-label="Delete collection"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);

CollectionsPanel.displayName = 'CollectionsPanel';
