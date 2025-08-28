import React from 'react';

interface GameSetupProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
  onStartGame: () => void;
}

const GameSetup: React.FC<GameSetupProps> = ({
  playerCount,
  onPlayerCountChange,
  onStartGame
}) => {
  const playerOptions = [3, 4, 5, 6, 7, 8];

  return (
    <div className="game-setup">
      <div className="setup-header">
        <h1 className="game-title">🦎 Chameleon</h1>
        <p className="game-subtitle">Pass & Play Game</p>
      </div>

      <div className="setup-content">
        <div className="player-selection">
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
        </div>

        <div className="game-rules">
          <h3>How to Play:</h3>
          <ol>
            <li>One player is secretly the <strong>Chameleon</strong></li>
            <li>Everyone else sees the <strong>secret word</strong></li>
            <li>Give clues related to the word</li>
            <li>Find the Chameleon who's trying to blend in!</li>
          </ol>
        </div>

        <button 
          className="start-button"
          onClick={onStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameSetup;