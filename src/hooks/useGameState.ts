import { useState, useCallback } from 'react';
import type { GameState } from '../types/game.types';
import { GamePhase } from '../types/game.types';
import { getRandomPlayer, getRandomCategory, getRandomWord, createPlayers } from '../utils/gameUtils';
import gameData from '../data/categories.json';

const initialGameState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  selectedCategory: null,
  selectedCategoryId: null,
  secretWord: '',
  chameleonId: -1,
  gamePhase: GamePhase.SETUP,
  playerCount: 3,
  playerNames: [],
  isReplay: false
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = useCallback(() => {
    setGameState(prev => {
      const chameleonId = getRandomPlayer(prev.playerCount);
      const players = createPlayers(prev.playerCount, chameleonId, prev.playerNames);
      
      // Use selected category or fall back to random
      const selectedCategory = prev.selectedCategoryId 
        ? gameData.categories.find(cat => cat.id === prev.selectedCategoryId) || getRandomCategory(gameData.categories)
        : getRandomCategory(gameData.categories);
      
      const secretWord = getRandomWord(selectedCategory.words);

      return {
        ...prev,
        players,
        currentPlayerIndex: 0,
        selectedCategory,
        secretWord,
        chameleonId,
        gamePhase: GamePhase.ROLE_REVEAL
      };
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
      playerCount: count,
      playerNames: Array(count).fill('').map((_, i) => prev.playerNames[i] || '')
    }));
  }, []);

  const setPlayerNames = useCallback((names: string[]) => {
    setGameState(prev => ({
      ...prev,
      playerNames: [...names]
    }));
  }, []);

  const setSelectedCategory = useCallback((categoryId: string | null) => {
    setGameState(prev => ({
      ...prev,
      selectedCategoryId: categoryId
    }));
  }, []);

  const playAgain = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      selectedCategoryId: null,
      selectedCategory: null,
      secretWord: '',
      chameleonId: -1,
      currentPlayerIndex: 0,
      gamePhase: GamePhase.CATEGORY_SELECT,
      isReplay: true,
      players: prev.players.map(player => ({
        ...player,
        hasRevealed: false
      }))
    }));
  }, []);

  return {
    gameState,
    startGame,
    nextPlayer,
    goToDiscussion,
    goToFinalReveal,
    resetGame,
    setPlayerCount,
    setPlayerNames,
    setSelectedCategory,
    playAgain
  };
};