import React, { useState } from 'react';
import './Lobby.css';

interface LobbyProps {
  onJoin: (playerName: string) => void;
  loading: boolean;
}

export const Lobby: React.FC<LobbyProps> = ({ onJoin, loading }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onJoin(playerName);
    }
  };

  return (
    <div className="lobby-container">
      <div className="lobby-card">
        <h1>Tic Tac Toe</h1>
        <h2>Multiplayer</h2>
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Procurando adversário...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Seu nome"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              autoFocus
            />
            <button type="submit" disabled={!playerName.trim()}>
              Jogar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
