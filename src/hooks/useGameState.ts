import { useState, useCallback } from 'react';
import type { GameState } from '../types/game.types';
import { GamePhase } from '../types/game.types';
import { getRandomPlayer, getRandomCategory, getRandomWord, createPlayers } from '../utils/gameUtils';
import gameData from '../data/categories.json';

const initialGameState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  selectedCategory: null,
  secretWord: '',
  chameleonId: -1,
  gamePhase: GamePhase.SETUP,
  playerCount: 3
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = useCallback((playerCount: number) => {
    const chameleonId = getRandomPlayer(playerCount);
    const players = createPlayers(playerCount, chameleonId);
    const selectedCategory = getRandomCategory(gameData.categories);
    const secretWord = getRandomWord(selectedCategory.words);

    setGameState({
      players,
      currentPlayerIndex: 0,
      selectedCategory,
      secretWord,
      chameleonId,
      gamePhase: GamePhase.ROLE_REVEAL,
      playerCount
    });
  }, []);

  const nextPlayer = useCallback(() => {
    setGameState(prev => {
      const nextIndex = prev.currentPlayerIndex + 1;
      
      // Mark current player as revealed
      const updatedPlayers = [...prev.players];
      updatedPlayers[prev.currentPlayerIndex].hasRevealed = true;

      // Check if all players have revealed
      if (nextIndex >= prev.players.length) {
        return {
          ...prev,
          players: updatedPlayers,
          gamePhase: GamePhase.DISCUSSION
        };
      }

      return {
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: nextIndex
      };
    });
  }, []);

  const goToDiscussion = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gamePhase: GamePhase.DISCUSSION
    }));
  }, []);

  const goToFinalReveal = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gamePhase: GamePhase.FINAL_REVEAL
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const setPlayerCount = useCallback((count: number) => {
    setGameState(prev => ({
      ...prev,
      playerCount: count
    }));
  }, []);

  return {
    gameState,
    startGame,
    nextPlayer,
    goToDiscussion,
    goToFinalReveal,
    resetGame,
    setPlayerCount
  };
};