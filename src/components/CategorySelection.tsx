import React from 'react';
import type { Category } from '../types/game.types';
import gameData from '../data/categories.json';

interface CategorySelectionProps {
  selectedCategoryId: string | null;
  playerNames: string[];
  onCategoryChange: (categoryId: string | null) => void;
  onStartGame: () => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategoryId,
  playerNames,
  onCategoryChange,
  onStartGame
}) => {
  // Allow starting with either a selected category or random (null)
  const canStartGame = true;

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
        <h2>Choose Category</h2>
        <div className="category-selection">
          <div 
            className={`category-card ${selectedCategoryId === null ? 'active' : ''}`}
            onClick={() => onCategoryChange(null)}
          >
            <h3>🎲 Random</h3>
            <p>Let the game choose!</p>
          </div>
          {gameData.categories.map((category: Category) => (
            <div
              key={category.id}
              className={`category-card ${selectedCategoryId === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <h3>{category.name}</h3>
              <div className="category-preview">
                {category.words.slice(0, 4).map((word, index) => (
                  <span key={index} className="preview-word">{word}</span>
                ))}
                <span className="more-indicator">+{category.words.length - 4} more</span>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="start-button"
          onClick={onStartGame}
          disabled={!canStartGame}
        >
          Start New Round
        </button>
      </div>
    </div>
  );
};

export default CategorySelection;