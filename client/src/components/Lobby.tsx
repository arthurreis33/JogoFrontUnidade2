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
        <h1>🎮 Tic Tac Toe</h1>
        <h2>Multiplayer Online</h2>
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Procurando adversário...</p>
            <p className="waiting-text">Aguarde enquanto procuramos um oponente para você...</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="join-form">
              <div className="form-group">
                <label htmlFor="playerName">Digite seu nome:</label>
                <input
                  id="playerName"
                  type="text"
                  placeholder="Seu nome (máx 20 caracteres)"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={20}
                  autoFocus
                  className="name-input"
                />
              </div>
              <button 
                type="submit" 
                disabled={!playerName.trim()}
                className="join-button"
              >
                Entrar na Fila ▶
              </button>
            </form>

            <div className="info-section">
              <h3>📋 Como Funciona?</h3>
              <ol className="instructions">
                <li>Digite seu nome acima</li>
                <li>Clique em "Entrar na Fila"</li>
                <li>Você será pareado com outro jogador</li>
                <li>A partida começará automaticamente!</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
