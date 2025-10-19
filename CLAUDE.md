# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production 
npm run build

# Type check without building
npx tsc --noEmit

# Lint code
npm run lint

# Preview production build locally
npm run preview
```

## Architecture Overview

This is a **Chameleon party game** web app built as a fully offline React SPA. The app implements a pass-and-play flow where players take turns revealing their roles on a shared device.

### Game Flow Architecture
The app follows a **finite state machine pattern** with 5 distinct phases:
1. `SETUP` - Multi-step player configuration (count → names → category)  
2. `CATEGORY_SELECT` - Category selection for replay games
3. `ROLE_REVEAL` - Sequential pass-and-play role revelation
4. `DISCUSSION` - Offline discussion phase with instructions
5. `FINAL_REVEAL` - Results screen with play-again options

### State Management Pattern
- **Single source of truth**: `useGameState` custom hook manages all game state
- **Immutable updates**: All state changes use functional updates with `setGameState(prev => ({...prev, ...}))`
- **Phase-based rendering**: Main App component uses switch statement on `gameState.gamePhase`
- **Centralized actions**: All game logic (chameleon selection, word picking, phase transitions) handled in the hook

### Key State Structure
```typescript
GameState {
  players: Player[]          // Array with roles and reveal status
  gamePhase: GamePhase      // Current game phase (enum-like const)
  selectedCategory: Category | null
  selectedCategoryId: string | null  // For category selection persistence
  chameleonId: number       // Index of chameleon player
  secretWord: string        // Current round's secret word
  playerNames: string[]     // Custom player names
  isReplay: boolean         // Distinguishes replay vs new game flow
}
```

### Component Architecture
- **Phase-specific components**: Each game phase has its own component (GameSetup, CategorySelection, RoleReveal, etc.)
- **Prop drilling pattern**: Game state and actions passed down from App component
- **No component state**: Components are mostly presentational, with game logic in useGameState
- **Mobile-first**: All components designed for touch interfaces and pass-and-play usage

### Data Management
- **Static game data**: Categories and words stored in `src/data/categories.json`
- **Random selection utilities**: Pure functions in `src/utils/gameUtils.ts` for chameleon/word selection
- **Type safety**: Comprehensive TypeScript interfaces in `src/types/game.types.ts`

### Play-Again Feature
The app supports two flows:
- **New Game**: Complete setup flow (SETUP → ROLE_REVEAL → ...)  
- **Play Again**: Skip to category selection (FINAL_REVEAL → CATEGORY_SELECT → ROLE_REVEAL → ...)

### CSS Architecture
- **Single stylesheet**: All styles in `src/styles/App.css`
- **Component-scoped classes**: CSS classes named after components (`.game-setup`, `.role-reveal`)
- **Mobile-first responsive**: Breakpoints at 480px with touch-friendly button sizing
- **CSS Grid/Flexbox**: Modern layout techniques for responsive category cards and player chips

## Key Implementation Details

### Chameleon Selection
Random chameleon selection uses `Math.floor(Math.random() * playerCount)` for fair distribution.

### Pass-and-Play Flow
RoleReveal component manages two-tap interaction: neutral handoff screen → role reveal → tap to continue.

### Category System
Categories are loaded from JSON with 6 predefined categories (Animals, Fruits, Countries, Colors, Food, Movies), each containing 12 words.

### TypeScript Patterns
- Uses `const` objects with `as const` for type-safe enums (GamePhase)
- Separates type definitions from implementation
- Leverages `type` imports for better build optimization