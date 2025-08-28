import React from 'react';

interface DiscussionProps {
  categoryName: string;
  playerCount: number;
  onRevealResults: () => void;
}

const Discussion: React.FC<DiscussionProps> = ({
  categoryName,
  playerCount,
  onRevealResults
}) => {
  return (
    <div className="discussion">
      <div className="discussion-content">
        <h1 className="discussion-title">Discussion Time</h1>
        
        <div className="discussion-info">
          <p className="category-info">
            Category: <strong>{categoryName}</strong>
          </p>
          <p className="player-info">
            {playerCount} players • 1 Chameleon
          </p>
        </div>

        <div className="discussion-instructions">
          <h2>What happens now:</h2>
          <ol>
            <li>Each player gives <strong>one clue</strong> about the word</li>
            <li>Discuss and <strong>vote</strong> for who you think is the Chameleon</li>
            <li>The Chameleon tries to <strong>guess the word</strong> if discovered</li>
          </ol>
        </div>

        <div className="discussion-tips">
          <h3>💡 Tips:</h3>
          <ul>
            <li><strong>Informed players:</strong> Give specific but not obvious clues</li>
            <li><strong>Chameleon:</strong> Listen carefully and blend in!</li>
            <li>Be creative with your clues to catch the Chameleon</li>
          </ul>
        </div>

        <button 
          className="reveal-button"
          onClick={onRevealResults}
        >
          Reveal Results
        </button>
      </div>
    </div>
  );
};

export default Discussion;