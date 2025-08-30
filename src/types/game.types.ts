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
  CATEGORY_SELECT: 'category_select' as const,
  ROLE_REVEAL: 'role_reveal' as const,
  DISCUSSION: 'discussion' as const,
  FINAL_REVEAL: 'final_reveal' as const
} as const;

export type GamePhase = typeof GamePhase[keyof typeof GamePhase];

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  selectedCategory: Category | null;
  selectedCategoryId: string | null;
  secretWord: string;
  chameleonId: number;
  gamePhase: GamePhase;
  playerCount: number;
  playerNames: string[];
  isReplay: boolean;
  customCategories: Category[];
}

export interface GameData {
  categories: Category[];
}