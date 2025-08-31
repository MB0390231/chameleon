import React, { useState } from 'react';
import type { Player } from '../types/game.types';

interface RoleRevealProps {
  players: Player[];
  currentPlayerIndex: number;
  secretWord: string;
  onNextPlayer: () => void;
  onFinishReveals: () => void;
}

const RoleReveal: React.FC<RoleRevealProps> = ({
  players,
  currentPlayerIndex,
  secretWord,
  onNextPlayer,
  onFinishReveals
}) => {
  const [showRole, setShowRole] = useState(false);
  const currentPlayer = players[currentPlayerIndex];
  const isLastPlayer = currentPlayerIndex >= players.length - 1;

  const handleRevealRole = () => {
    setShowRole(true);
  };

  const handleContinue = () => {
    setShowRole(false);
    if (isLastPlayer) {
      onFinishReveals();
    } else {
      onNextPlayer();
    }
  };

  if (!showRole) {
    return (
      <div className="role-reveal">
        <div className="handoff-screen">
          <div className="handoff-content">
            <h2>Pass phone to:</h2>
            <h1 className="player-name">{currentPlayer.name}</h1>
            <p className="player-progress">
              Player {currentPlayerIndex + 1} of {players.length}
            </p>
            <button 
              className="reveal-button"
              onClick={handleRevealRole}
            >
              Tap to Reveal Role
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="role-reveal">
      <div className="role-screen">
        <div className="role-content">
          <h2 className="player-name">{currentPlayer.name}</h2>
          
          {currentPlayer.role === 'chameleon' ? (
            <div className="chameleon-reveal">
              <div className="chameleon-icon">🦎</div>
              <h1 className="role-title">You are the CHAMELEON</h1>
              <p className="role-instruction">
                Try to blend in without knowing the secret word!
              </p>
            </div>
          ) : (
            <div className="informed-reveal">
              <h1 className="role-title">Your secret word is:</h1>
              <div className="secret-word">{secretWord}</div>
              <p className="role-instruction">
                Remember this word and give clues!
              </p>
            </div>
          )}

          <button 
            className="continue-button"
            onClick={handleContinue}
          >
            {isLastPlayer ? 'Start Discussion' : 'Next Player'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleReveal;