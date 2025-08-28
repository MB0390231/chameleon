import { useGameState } from './hooks/useGameState';
import { GamePhase } from './types/game.types';
import GameSetup from './components/GameSetup';
import RoleReveal from './components/RoleReveal';
import Discussion from './components/Discussion';
import FinalReveal from './components/FinalReveal';
import './styles/App.css';

function App() {
  const {
    gameState,
    startGame,
    nextPlayer,
    goToDiscussion,
    goToFinalReveal,
    resetGame,
    setPlayerCount,
    setPlayerNames,
    setSelectedCategory
  } = useGameState();

  const renderCurrentPhase = () => {
    switch (gameState.gamePhase) {
      case GamePhase.SETUP:
        return (
          <GameSetup
            playerCount={gameState.playerCount}
            playerNames={gameState.playerNames}
            selectedCategoryId={gameState.selectedCategoryId}
            onPlayerCountChange={setPlayerCount}
            onPlayerNamesChange={setPlayerNames}
            onCategoryChange={setSelectedCategory}
            onStartGame={startGame}
          />
        );

      case GamePhase.ROLE_REVEAL:
        return (
          <RoleReveal
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            secretWord={gameState.secretWord}
            categoryName={gameState.selectedCategory?.name || ''}
            onNextPlayer={nextPlayer}
            onFinishReveals={goToDiscussion}
          />
        );

      case GamePhase.DISCUSSION:
        return (
          <Discussion
            categoryName={gameState.selectedCategory?.name || ''}
            playerCount={gameState.playerCount}
            onRevealResults={goToFinalReveal}
          />
        );

      case GamePhase.FINAL_REVEAL:
        return (
          <FinalReveal
            secretWord={gameState.secretWord}
            category={gameState.selectedCategory!}
            chameleonId={gameState.chameleonId}
            players={gameState.players}
            onNewGame={resetGame}
          />
        );

      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="app">
      {renderCurrentPhase()}
    </div>
  );
}

export default App
