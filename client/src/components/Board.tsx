import React from 'react';
import type { GameState } from '../types/game';
import './Board.css';

interface BoardProps {
  gameState: GameState;
  playerId: string;
  onCellClick: (position: number) => void;
}

export const Board: React.FC<BoardProps> = ({ gameState, playerId, onCellClick }) => {
  const isCurrentPlayer =
    gameState.players[gameState.currentPlayerIndex].id === playerId;
  const isGameFinished = gameState.status === 'finished';
  const canPlay = isCurrentPlayer && !isGameFinished;

  const handleCellClick = (position: number) => {
    if (canPlay && gameState.board[position] === null) {
      onCellClick(position);
    }
  };

  return (
    <div className="board-container">
      <div className="board">
        {gameState.board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? 'filled' : ''} ${!canPlay && cell === null ? 'disabled' : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={!canPlay || cell !== null}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};
