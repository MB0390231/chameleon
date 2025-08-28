import React from 'react';
import type { Player, Category } from '../types/game.types';

interface FinalRevealProps {
  secretWord: string;
  category: Category;
  chameleonId: number;
  players: Player[];
  onNewGame: () => void;
  onPlayAgain: () => void;
}

const FinalReveal: React.FC<FinalRevealProps> = ({
  secretWord,
  category,
  chameleonId,
  players,
  onNewGame,
  onPlayAgain
}) => {
  const chameleonPlayer = players.find(player => player.id === chameleonId);

  return (
    <div className="final-reveal">
      <div className="reveal-content">
        <h1 className="reveal-title">Game Over!</h1>
        
        <div className="secret-word-reveal">
          <h2>The secret word was:</h2>
          <div className="final-secret-word">{secretWord}</div>
        </div>

        <div className="chameleon-reveal">
          <h2>The Chameleon was:</h2>
          <div className="chameleon-player">
            <span className="chameleon-icon">🦎</span>
            <span className="chameleon-name">
              {chameleonPlayer?.name || 'Unknown'}
            </span>
          </div>
        </div>

        <div className="category-words">
          <h3>All words in "{category.name}":</h3>
          <div className="word-grid">
            {category.words.map((word, index) => (
              <span 
                key={index} 
                className={`word-item ${word === secretWord ? 'secret-word' : ''}`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="game-actions">
          <button 
            className="play-again-button"
            onClick={onPlayAgain}
          >
            Play Again (Same Players)
          </button>
          <button 
            className="new-game-button"
            onClick={onNewGame}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalReveal;