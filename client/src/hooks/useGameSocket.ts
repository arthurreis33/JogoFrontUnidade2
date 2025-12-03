import { useEffect, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import type { GameState } from '../types/game';

// Detectar URL do servidor
const getSocketUrl = () => {
  // Em produção, frontend e backend estão no mesmo servidor
  // Socket.IO detecta automaticamente via location
  return undefined; // Socket.IO usa window.location por padrão
};

const SOCKET_URL = getSocketUrl();

export const useGameSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      setConnected(true);
      setError(null);
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
    });

    newSocket.on('queue_joined', (data: { playerId: string }) => {
      setPlayerId(data.playerId);
      setLoading(true);
    });

    newSocket.on('game_started', (data: { gameId: string; gameState: GameState }) => {
      setGameState(data.gameState);
      setLoading(false);
    });

    newSocket.on('game_update', (data: { gameState: GameState }) => {
      setGameState(data.gameState);
    });

    newSocket.on('move_error', (data: { message: string }) => {
      setError(data.message);
      setTimeout(() => setError(null), 3000);
    });

    newSocket.on('connect_error', (error: any) => {
      setError('Erro ao conectar ao servidor');
      console.error('Connection error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinQueue = useCallback(
    (playerName: string) => {
      if (socket && connected) {
        socket.emit('join_queue', playerName);
      }
    },
    [socket, connected]
  );

  const makeMove = useCallback(
    (position: number) => {
      if (socket && gameState && playerId) {
        socket.emit('make_move', {
          gameId: gameState.id,
          position,
        });
      }
    },
    [socket, gameState, playerId]
  );

  const resetGame = useCallback(() => {
    if (socket && gameState) {
      socket.emit('reset_game', gameState.id);
    }
  }, [socket, gameState]);

  return {
    socket,
    playerId,
    gameState,
    connected,
    loading,
    error,
    joinQueue,
    makeMove,
    resetGame,
  };
};
