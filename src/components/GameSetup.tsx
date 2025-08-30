import React, { useState } from 'react';
import type { Category } from '../types/game.types';
import gameData from '../data/categories.json';
import CategoryManagement from './CategoryManagement';

interface GameSetupProps {
  playerCount: number;
  playerNames: string[];
  selectedCategoryId: string | null;
  customCategories: Category[];
  onPlayerCountChange: (count: number) => void;
  onPlayerNamesChange: (names: string[]) => void;
  onCategoryChange: (categoryId: string | null) => void;
  onStartGame: () => void;
  onAddCustomCategory: (name: string, words: string[]) => void;
  onUpdateCustomCategory: (id: string, name: string, words: string[]) => void;
  onDeleteCustomCategory: (id: string) => void;
}

type SetupStep = 'players' | 'names' | 'category';

const GameSetup: React.FC<GameSetupProps> = ({
  playerCount,
  playerNames,
  selectedCategoryId,
  customCategories,
  onPlayerCountChange,
  onPlayerNamesChange,
  onCategoryChange,
  onStartGame,
  onAddCustomCategory,
  onUpdateCustomCategory,
  onDeleteCustomCategory
}) => {
  const [currentStep, setCurrentStep] = useState<SetupStep>('players');
  const [showManagement, setShowManagement] = useState(false);
  const playerOptions = [3, 4, 5, 6, 7, 8];
  const allCategories = [...gameData.categories, ...customCategories];

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    onPlayerNamesChange(newNames);
  };

  const canProceedFromNames = playerNames.slice(0, playerCount).every(name => name.trim().length > 0);
  const canStartGame = canProceedFromNames;

  const renderPlayerCountStep = () => (
    <div className="setup-step">
      <h2>Number of Players</h2>
      <div className="player-buttons">
        {playerOptions.map((count) => (
          <button
            key={count}
            className={`player-button ${playerCount === count ? 'active' : ''}`}
            onClick={() => onPlayerCountChange(count)}
          >
            {count}
          </button>
        ))}
      </div>
      <button 
        className="next-button"
        onClick={() => setCurrentStep('names')}
      >
        Next: Enter Names
      </button>
    </div>
  );

  const renderNamesStep = () => (
    <div className="setup-step">
      <h2>Enter Player Names</h2>
      <div className="name-inputs">
        {Array.from({ length: playerCount }, (_, index) => (
          <div key={index} className="name-input-group">
            <label htmlFor={`player-${index}`}>
              Player {index + 1}:
            </label>
            <input
              id={`player-${index}`}
              type="text"
              value={playerNames[index] || ''}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder={`Player ${index + 1} name`}
              className="name-input"
            />
          </div>
        ))}
      </div>
      <div className="step-buttons">
        <button 
          className="back-button"
          onClick={() => setCurrentStep('players')}
        >
          Back
        </button>
        <button 
          className="next-button"
          onClick={() => setCurrentStep('category')}
          disabled={!canProceedFromNames}
        >
          Next: Choose Category
        </button>
      </div>
    </div>
  );

  const renderCategoryStep = () => (
    <div className="setup-step">
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
      <div className="step-buttons">
        <button 
          className="back-button"
          onClick={() => setCurrentStep('names')}
        >
          Back
        </button>
        <button 
          className="start-button"
          onClick={onStartGame}
          disabled={!canStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );

  return (
    <div className="game-setup">
      <div className="setup-header">
        <h1 className="game-title">🦎 Chameleon</h1>
        <p className="game-subtitle">Pass & Play Game</p>
      </div>

      <div className="setup-progress">
        <div className={`progress-step ${currentStep === 'players' ? 'active' : 'completed'}`}>
          Players
        </div>
        <div className={`progress-step ${currentStep === 'names' ? 'active' : currentStep === 'category' ? 'completed' : ''}`}>
          Names
        </div>
        <div className={`progress-step ${currentStep === 'category' ? 'active' : ''}`}>
          Category
        </div>
      </div>

      <div className="setup-content">
        {currentStep === 'players' && renderPlayerCountStep()}
        {currentStep === 'names' && renderNamesStep()}
        {currentStep === 'category' && renderCategoryStep()}
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

export default GameSetup;