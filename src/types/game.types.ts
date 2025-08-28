export interface Category {
  id: string;
  name: string;
  words: string[];
}

export interface Player {
  id: number;
  name: string;
  role: 'informed' | 'chameleon';
  hasRevealed: boolean;
}

export const GamePhase = {
  SETUP: 'setup' as const,
  ROLE_REVEAL: 'role_reveal' as const,
  DISCUSSION: 'discussion' as const,
  FINAL_REVEAL: 'final_reveal' as const
} as const;

export type GamePhase = typeof GamePhase[keyof typeof GamePhase];

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  selectedCategory: Category | null;
  secretWord: string;
  chameleonId: number;
  gamePhase: GamePhase;
  playerCount: number;
}

export interface GameData {
  categories: Category[];
}