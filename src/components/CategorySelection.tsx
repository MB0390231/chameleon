import React, { useState } from 'react';
import type { Category } from '../types/game.types';
import gameData from '../data/categories.json';
import CategoryManagement from './CategoryManagement';

interface CategorySelectionProps {
  selectedCategoryId: string | null;
  playerNames: string[];
  customCategories: Category[];
  onCategoryChange: (categoryId: string | null) => void;
  onStartGame: () => void;
  onAddCustomCategory: (name: string, words: string[]) => void;
  onUpdateCustomCategory: (id: string, name: string, words: string[]) => void;
  onDeleteCustomCategory: (id: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategoryId,
  playerNames,
  customCategories,
  onCategoryChange,
  onStartGame,
  onAddCustomCategory,
  onUpdateCustomCategory,
  onDeleteCustomCategory
}) => {
  const [showManagement, setShowManagement] = useState(false);
  const canStartGame = true;
  const allCategories = [...gameData.categories, ...customCategories];

  return (
    <div className="category-selection-page">
      <div className="selection-header">
        <h1 className="game-title">🦎 Round 2!</h1>
        <div className="players-summary">
          <h2>Players:</h2>
          <div className="player-names">
            {playerNames.map((name, index) => (
              <span key={index} className="player-chip">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="selection-content">
        <div className="category-header">
          <h2>Choose Category</h2>
          <button 
            className="manage-categories-button"
            onClick={() => setShowManagement(true)}
          >
            ⚙️ Manage Categories
          </button>
        </div>
        
        <div className="category-selection">
          <div 
            className={`category-card ${selectedCategoryId === null ? 'active' : ''}`}
            onClick={() => onCategoryChange(null)}
          >
            <h3>🎲 Random</h3>
            <p>Let the game choose!</p>
          </div>
          {allCategories.map((category: Category) => {
            const isCustom = customCategories.some(c => c.id === category.id);
            return (
              <div
                key={category.id}
                className={`category-card ${selectedCategoryId === category.id ? 'active' : ''} ${isCustom ? 'custom-category' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                <div className="category-card-header">
                  <h3>{category.name}</h3>
                  {isCustom && <span className="custom-badge">Custom</span>}
                </div>
                <div className="category-preview">
                  {category.words.slice(0, 4).map((word, index) => (
                    <span key={index} className="preview-word">{word}</span>
                  ))}
                  <span className="more-indicator">+{category.words.length - 4} more</span>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          className="start-button"
          onClick={onStartGame}
          disabled={!canStartGame}
        >
          Start New Round
        </button>
      </div>

      {showManagement && (
        <CategoryManagement
          customCategories={customCategories}
          onAddCategory={onAddCustomCategory}
          onUpdateCategory={onUpdateCustomCategory}
          onDeleteCategory={onDeleteCustomCategory}
          onClose={() => setShowManagement(false)}
        />
      )}
    </div>
  );
};

export default CategorySelection;