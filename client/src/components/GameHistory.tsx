import React from 'react';
import './GameHistory.css';

interface GameRecord {
  id: string;
  player1: string;
  player2: string;
  winner: string;
  date: string;
}

interface GameHistoryProps {
  games: GameRecord[];
}

export const GameHistory: React.FC<GameHistoryProps> = ({ games }) => {
  return (
    <div className="game-history">
      <h3>📋 Histórico de Partidas</h3>
      {games.length === 0 ? (
        <p className="no-games">Nenhuma partida jogada ainda.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Jogador 1</th>
              <th>Jogador 2</th>
              <th>Vencedor</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="game-row">
                <td className="player-name">{game.player1}</td>
                <td className="player-name">{game.player2}</td>
                <td className={`winner ${game.winner === 'Empate' ? 'draw' : 'victory'}`}>
                  {game.winner === 'Empate' ? '🤝 Empate' : `🏆 ${game.winner}`}
                </td>
                <td className="timestamp">{game.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
