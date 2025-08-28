# 🦎 Chameleon Pass & Play - Technical Specification

## 1. Project Overview

**Name**: Chameleon Pass & Play Web App  
**Type**: Offline React Single Page Application  
**Target Audience**: Groups of 3-8 players  
**Platform**: Mobile-first responsive web app  

## 2. Core Requirements

### 2.1 Technology Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: CSS Modules or Tailwind CSS
- **State Management**: React useState/useReducer hooks
- **Data Storage**: Local JSON files or hardcoded arrays
- **Build Tool**: Vite or Create React App
- **Deployment**: Static hosting (Vercel, Netlify, etc.)

### 2.2 Key Features
- ✅ Fully offline functionality
- ✅ Pass-and-play role revelation system
- ✅ Random Chameleon and word selection
- ✅ Mobile-optimized touch interface
- ✅ No authentication or user accounts needed

## 3. Game Flow Architecture

### 3.1 Game States
```typescript
enum GameState {
  SETUP = 'setup',
  ROLE_REVEAL = 'role_reveal',
  DISCUSSION = 'discussion',
  FINAL_REVEAL = 'final_reveal'
}
```

### 3.2 Flow Sequence
1. **Setup Phase**
   - Select number of players (3-8)
   - App randomly assigns one Chameleon
   - App selects random category and secret word

2. **Role Reveal Phase**
   - Sequential pass-and-play revelation
   - Neutral handoff screens between players
   - Role-specific information display

3. **Discussion Phase**
   - Offline player interaction
   - Timer (optional feature)

4. **Final Reveal Phase**
   - Show secret word
   - Reveal Chameleon identity
   - Display full category word list

## 4. Data Models

### 4.1 Category Structure
```typescript
interface Category {
  id: string;
  name: string;
  words: string[];
}

interface GameData {
  categories: Category[];
}
```

### 4.2 Game State Structure
```typescript
interface Player {
  id: number;
  name: string;
  role: 'informed' | 'chameleon';
  hasRevealed: boolean;
}

interface GameState {
  players: Player[];
  currentPlayer: number;
  selectedCategory: Category;
  secretWord: string;
  chameleonId: number;
  gamePhase: GamePhase;
}
```

### 4.3 Sample Data
```json
{
  "categories": [
    {
      "id": "animals",
      "name": "Animals",
      "words": ["Lion", "Elephant", "Kangaroo", "Dolphin", "Eagle", "Panda", "Shark", "Penguin"]
    },
    {
      "id": "fruits",
      "name": "Fruits", 
      "words": ["Apple", "Banana", "Orange", "Grape", "Mango", "Pineapple", "Strawberry", "Pear"]
    },
    {
      "id": "countries",
      "name": "Countries",
      "words": ["Japan", "France", "Brazil", "Canada", "Egypt", "Australia", "Mexico", "Germany"]
    }
  ]
}
```

## 5. Component Architecture

### 5.1 Component Tree
```
App
├── GameSetup
│   ├── PlayerCountSelector
│   └── StartGameButton
├── RoleReveal
│   ├── PlayerHandoff
│   ├── RoleDisplay
│   └── NavigationControls
├── DiscussionTimer (optional)
└── FinalReveal
    ├── SecretWordDisplay
    ├── ChameleonReveal
    └── CategoryWordList
```

### 5.2 Component Specifications

#### GameSetup Component
```typescript
interface GameSetupProps {
  onStartGame: (playerCount: number) => void;
}
```
- Player count selection (3-8)
- Start game button
- Basic game rules display

#### RoleReveal Component
```typescript
interface RoleRevealProps {
  players: Player[];
  currentPlayer: number;
  secretWord: string;
  onNextPlayer: () => void;
  onFinishReveals: () => void;
}
```
- Neutral handoff screen
- Role-specific reveal screen
- Progress indicator

#### FinalReveal Component
```typescript
interface FinalRevealProps {
  secretWord: string;
  category: Category;
  chameleonId: number;
  players: Player[];
  onNewGame: () => void;
}
```
- Secret word display
- Chameleon identity reveal
- Full category word list
- New game button

## 6. User Interface Specifications

### 6.1 Design Principles
- **Mobile-First**: Optimized for phone screens
- **Large Touch Targets**: Minimum 44px tap areas
- **High Contrast**: Clear readability
- **Simple Navigation**: Minimal UI complexity

### 6.2 Screen Specifications

#### Setup Screen
- Title and game logo
- Player count slider/buttons (3-8)
- Large "Start Game" button
- Brief rules summary

#### Handoff Screen
```
Pass phone to:
[PLAYER NAME]

[TAP TO REVEAL ROLE]
```

#### Role Reveal Screens
**Informed Player:**
```
Your secret word is:
[SECRET WORD]

Remember this word!

[TAP TO CONTINUE]
```

**Chameleon:**
```
🦎 You are the CHAMELEON

Try to blend in!

[TAP TO CONTINUE]
```

#### Final Reveal Screen
```
The secret word was:
[SECRET WORD]

The Chameleon was:
[PLAYER NAME]

All words in [CATEGORY]:
[WORD LIST]

[NEW GAME]
```

## 7. Technical Implementation Details

### 7.1 State Management
- Use `useReducer` for complex game state
- `useState` for simple component state
- No external state management needed

### 7.2 Random Generation
```typescript
// Utility functions needed
const getRandomPlayer = (count: number): number
const getRandomCategory = (categories: Category[]): Category  
const getRandomWord = (words: string[]): string
```

### 7.3 Local Storage (Optional)
- Save game categories for offline use
- Store player preferences
- Cache game statistics

## 8. Performance Requirements

### 8.1 Loading
- Initial page load < 2 seconds
- Component transitions < 100ms
- Offline-first functionality

### 8.2 Compatibility
- iOS Safari 14+
- Chrome Mobile 90+
- Firefox Mobile 90+
- Responsive design 320px - 1024px

## 9. Development Phases

### Phase 1: MVP (Week 1)
- Basic game flow
- Core components
- 3 default categories
- Mobile-responsive design

### Phase 2: Polish (Week 2)
- Animations and transitions
- Error handling
- Additional categories
- Accessibility improvements

### Phase 3: Enhancements (Future)
- Timer functionality
- Custom categories
- Dark mode
- PWA capabilities

## 10. File Structure

```
chameleon/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GameSetup.tsx
│   │   ├── RoleReveal.tsx
│   │   ├── FinalReveal.tsx
│   │   └── common/
│   ├── data/
│   │   └── categories.json
│   ├── hooks/
│   │   └── useGameState.ts
│   ├── types/
│   │   └── game.types.ts
│   ├── utils/
│   │   └── gameUtils.ts
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

## 11. Testing Strategy

### 11.1 Unit Tests
- Game logic utilities
- Random generation functions
- Component rendering

### 11.2 Integration Tests  
- Complete game flow
- State management
- User interactions

### 11.3 Manual Testing
- Multi-device testing
- Pass-and-play user experience
- Performance on slower devices