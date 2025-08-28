# 🦎 Chameleon - Pass & Play Game

A simple, offline web app implementation of the popular Chameleon party game. Perfect for groups of 3-8 players!

## How to Play

1. **Setup**: Select the number of players (3-8) and start the game
2. **Role Reveal**: Pass the phone around - each player privately sees either:
   - The secret word (if you're informed)
   - "You are the Chameleon" (if you're the chameleon)
3. **Discussion**: Everyone gives clues about the word, trying to find the chameleon
4. **Voting**: Vote for who you think is the chameleon
5. **Reveal**: See the results and try again!

## Features

- ✅ Fully offline - no internet required
- ✅ Mobile-optimized pass-and-play interface
- ✅ 6 categories with 12 words each
- ✅ Touch-friendly design
- ✅ No accounts or setup needed

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

## Deployment

Build the project and deploy the `dist` folder to any static hosting service:

- Vercel
- Netlify 
- GitHub Pages
- Firebase Hosting

## Game Categories

- Animals
- Fruits
- Countries
- Colors
- Food
- Movies

## Tech Stack

- React 19 + TypeScript
- Vite
- CSS3 (no external dependencies)
- Fully responsive design
