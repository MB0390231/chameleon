import React, { useState } from 'react';
import type { Category } from '../types/game.types';

interface CategoryManagementProps {
  customCategories: Category[];
  onAddCategory: (name: string, words: string[]) => void;
  onUpdateCategory: (id: string, name: string, words: string[]) => void;
  onDeleteCategory: (id: string) => void;
  onClose: () => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({
  customCategories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onClose
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryWords, setNewCategoryWords] = useState('');
  const [editName, setEditName] = useState('');
  const [editWords, setEditWords] = useState('');

  const parseWords = (wordsText: string): string[] => {
    return wordsText
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0);
  };

  const handleAddCategory = () => {
    const words = parseWords(newCategoryWords);
    if (newCategoryName.trim() && words.length >= 6) {
      onAddCategory(newCategoryName.trim(), words);
      setNewCategoryName('');
      setNewCategoryWords('');
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditWords(category.words.join(', '));
  };

  const handleSaveEdit = () => {
    if (editingId) {
      const words = parseWords(editWords);
      if (editName.trim() && words.length >= 6) {
        onUpdateCategory(editingId, editName.trim(), words);
        setEditingId(null);
        setEditName('');
        setEditWords('');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditWords('');
  };

  const newWords = parseWords(newCategoryWords);
  const editWordsArray = parseWords(editWords);

  return (
    <div className="category-management-overlay">
      <div className="category-management-modal">
        <div className="modal-header">
          <h2>Manage Categories</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="modal-content">
          <div className="add-category-section">
            <h3>Add New Category</h3>
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="category-name-input"
            />
            <textarea
              placeholder="Enter words separated by commas (e.g., dog, cat, fish)"
              value={newCategoryWords}
              onChange={(e) => setNewCategoryWords(e.target.value)}
              className="category-words-input"
              rows={3}
            />
            <div className="word-count">
              {newWords.length} words {newWords.length < 6 && '(minimum 6 required)'}
            </div>
            <button
              className="add-button"
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim() || newWords.length < 6}
            >
              Add Category
            </button>
          </div>

          <div className="existing-categories-section">
            <h3>Your Custom Categories</h3>
            {customCategories.length === 0 ? (
              <p className="no-categories">No custom categories yet. Add one above!</p>
            ) : (
              <div className="categories-list">
                {customCategories.map(category => (
                  <div key={category.id} className="category-item">
                    {editingId === category.id ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="edit-name-input"
                        />
                        <textarea
                          value={editWords}
                          onChange={(e) => setEditWords(e.target.value)}
                          className="edit-words-input"
                          rows={3}
                        />
                        <div className="word-count">
                          {editWordsArray.length} words {editWordsArray.length < 6 && '(minimum 6 required)'}
                        </div>
                        <div className="edit-buttons">
                          <button
                            className="save-button"
                            onClick={handleSaveEdit}
                            disabled={!editName.trim() || editWordsArray.length < 6}
                          >
                            Save
                          </button>
                          <button className="cancel-button" onClick={handleCancelEdit}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="category-display">
                        <div className="category-header">
                          <h4>{category.name}</h4>
                          <span className="custom-badge">Custom</span>
                        </div>
                        <div className="category-words-preview">
                          {category.words.slice(0, 6).join(', ')}
                          {category.words.length > 6 && ` +${category.words.length - 6} more`}
                        </div>
                        <div className="category-actions">
                          <button
                            className="edit-button"
                            onClick={() => handleEditCategory(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => onDeleteCategory(category.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;