import React, { useState, useEffect } from 'react';
import { useGameSocket } from './hooks/useGameSocket';
import { Lobby } from './components/Lobby';
import { Game } from './components/Game';
import { GameHistory } from './components/GameHistory';
import './App.css';

interface GameRecord {
  id: string;
  player1: string;
  player2: string;
  winner: string;
  date: string;
}

function App() {
  const { gameState, playerId, connected, loading, error, joinQueue, makeMove, resetGame } =
    useGameSocket();

  const [gameHistory, setGameHistory] = useState<GameRecord[]>([]);

  // Adicionar ao histórico quando uma partida termina
  useEffect(() => {
    if (gameState && gameState.winner && gameState.players.length === 2) {
      const lastGame = gameHistory.find(
        (g) =>
          g.player1 === gameState.players[0].name && g.player2 === gameState.players[1].name
      );

      // Evitar duplicatas
      if (!lastGame) {
        const winner =
          gameState.winner === 'draw'
            ? 'Empate'
            : gameState.players.find((p) => p.symbol === gameState.winner)?.name || 'Desconhecido';

        const newGame: GameRecord = {
          id: `game_${Date.now()}`,
          player1: gameState.players[0].name,
          player2: gameState.players[1].name,
          winner,
          date: new Date().toLocaleString('pt-BR'),
        };

        setGameHistory((prev) => [newGame, ...prev.slice(0, 9)]); // Manter últimas 10
      }
    }
  }, [gameState?.winner]);

  if (!connected) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Conectando ao servidor...</p>
      </div>
    );
  }

  if (!gameState || !playerId) {
    return (
      <div className="app-wrapper">
        <Lobby onJoin={joinQueue} loading={loading} />
        {gameHistory.length > 0 && <GameHistory games={gameHistory} />}
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Game
        gameState={gameState}
        playerId={playerId}
        onMakeMove={makeMove}
        onResetGame={resetGame}
        error={error}
      />
      {gameHistory.length > 0 && <GameHistory games={gameHistory} />}
    </div>
  );
}

export default App;
