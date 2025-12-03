import React from 'react';
import { useGameSocket } from './hooks/useGameSocket';
import { Lobby } from './components/Lobby';
import { Game } from './components/Game';
import './App.css';

function App() {
  const { gameState, playerId, connected, loading, error, joinQueue, makeMove, resetGame } =
    useGameSocket();

  if (!connected) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Conectando ao servidor...</p>
      </div>
    );
  }

  if (!gameState || !playerId) {
    return <Lobby onJoin={joinQueue} loading={loading} />;
  }

  return (
    <Game
      gameState={gameState}
      playerId={playerId}
      onMakeMove={makeMove}
      onResetGame={resetGame}
      error={error}
    />
  );
}

export default App;
