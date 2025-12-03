import React from 'react';
import type { GameState } from '../types/game';
import { Board } from './Board';
import './Game.css';

interface GameProps {
  gameState: GameState;
  playerId: string;
  onMakeMove: (position: number) => void;
  onResetGame: () => void;
  error?: string | null;
}

export const Game: React.FC<GameProps> = ({
  gameState,
  playerId,
  onMakeMove,
  onResetGame,
  error,
}) => {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const playerIndex = gameState.players.findIndex((p) => p.id === playerId);
  const currentPlayerName = currentPlayer.name;
  const mySymbol = gameState.players[playerIndex].symbol;
  const isMyTurn = currentPlayer.id === playerId;
  const isGameFinished = gameState.status === 'finished';

  const renderResult = () => {
    if (gameState.winner === 'draw') {
      return <span className="result draw">Empate!</span>;
    }
    if (gameState.winner) {
      const winnerId = gameState.winnerId;
      const winner = gameState.players.find((p) => p.id === winnerId);
      if (winner?.id === playerId) {
        return <span className="result win">Você venceu! 🎉</span>;
      } else {
        return <span className="result lose">{winner?.name} venceu!</span>;
      }
    }
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <div className="game-header">
          <h1>Tic Tac Toe</h1>
          <div className="players-info">
            <div className={`player ${playerIndex === 0 ? 'active' : ''}`}>
              <span className="symbol">X</span>
              <span className="name">{gameState.players[0].name}</span>
            </div>
            <span className="vs">vs</span>
            <div className={`player ${playerIndex === 1 ? 'active' : ''}`}>
              <span className="symbol">O</span>
              <span className="name">{gameState.players[1].name}</span>
            </div>
          </div>
        </div>

        <div className="game-status">
          {isGameFinished ? (
            <div className="status-finished">
              {renderResult()}
            </div>
          ) : (
            <div className={`status-playing ${isMyTurn ? 'my-turn' : ''}`}>
              {isMyTurn ? (
                <>
                  <span className="pulse">●</span>
                  <span>Sua vez ({mySymbol})</span>
                </>
              ) : (
                <>
                  <span>Turno de {currentPlayerName}</span>
                </>
              )}
            </div>
          )}
        </div>

        <Board
          gameState={gameState}
          playerId={playerId}
          onCellClick={onMakeMove}
        />

        {error && <div className="error-message">{error}</div>}

        {isGameFinished && (
          <button className="reset-button" onClick={onResetGame}>
            Nova Partida
          </button>
        )}
      </div>
    </div>
  );
};
