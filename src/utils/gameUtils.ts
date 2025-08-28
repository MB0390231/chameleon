import type { Category, Player } from '../types/game.types';

export const getRandomElement = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getRandomPlayer = (playerCount: number): number => {
  return Math.floor(Math.random() * playerCount);
};

export const getRandomCategory = (categories: Category[]): Category => {
  return getRandomElement(categories);
};

export const getRandomWord = (words: string[]): string => {
  return getRandomElement(words);
};

export const createPlayers = (count: number, chameleonId: number): Player[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `Player ${index + 1}`,
    role: index === chameleonId ? 'chameleon' : 'informed',
    hasRevealed: false
  }));
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};