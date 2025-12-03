import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GameManager } from './game/gameManager.js';
import { Player, GameMove } from './types/game.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const gameManager = new GameManager();
const playerSockets: Map<string, string> = new Map(); // playerId -> socketId
const socketPlayers: Map<string, string> = new Map(); // socketId -> playerId
const playerGames: Map<string, string> = new Map(); // playerId -> gameId

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do cliente em produção
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Servir index.html para rotas não encontradas (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Jogador se junta à fila de espera
  socket.on('join_queue', (playerName: string) => {
    const playerId = `player_${Date.now()}_${Math.random()}`;
    const player: Player = {
      id: playerId,
      name: playerName,
      score: 0,
      currentTurn: false,
      symbol: 'X',
    };

    playerSockets.set(playerId, socket.id);
    socketPlayers.set(socket.id, playerId);
    gameManager.addPlayerToWaiting(player);

    socket.emit('queue_joined', { playerId });

    // Tentar encontrar um oponente
    const waitingPlayers = gameManager.getWaitingPlayers();
    if (waitingPlayers.length >= 2) {
      const player1 = waitingPlayers[0];
      const player2 = waitingPlayers[1];

      const gameId = gameManager.createGame();
      player1.symbol = 'X';
      player2.symbol = 'O';

      gameManager.joinGame(gameId, player1);
      gameManager.joinGame(gameId, player2);

      playerGames.set(player1.id, gameId);
      playerGames.set(player2.id, gameId);

      const gameState = gameManager.getGame(gameId);

      const socket1 = playerSockets.get(player1.id);
      const socket2 = playerSockets.get(player2.id);

      if (socket1) io.to(socket1).emit('game_started', { gameId, gameState });
      if (socket2) io.to(socket2).emit('game_started', { gameId, gameState });

      console.log(`Game ${gameId} started: ${player1.name} vs ${player2.name}`);
    }
  });

  // Jogador faz uma jogada
  socket.on('make_move', (data: { gameId: string; position: number }) => {
    const playerId = socketPlayers.get(socket.id);
    if (!playerId) return;

    const { gameId, position } = data;
    const result = gameManager.makeMove(gameId, playerId, position);

    if (result.success && result.state) {
      const game = result.state;
      const player1SocketId = playerSockets.get(game.players[0].id);
      const player2SocketId = playerSockets.get(game.players[1].id);

      if (player1SocketId) {
        io.to(player1SocketId).emit('game_update', {
          gameState: game,
        });
      }
      if (player2SocketId) {
        io.to(player2SocketId).emit('game_update', {
          gameState: game,
        });
      }

      if (game.status === 'finished') {
        console.log(`Game ${gameId} finished. Winner: ${game.winner}`);
      }
    } else {
      socket.emit('move_error', { message: 'Invalid move' });
    }
  });

  // Resetar jogo
  socket.on('reset_game', (gameId: string) => {
    gameManager.resetGame(gameId);
    const gameState = gameManager.getGame(gameId);

    if (gameState) {
      const player1SocketId = playerSockets.get(gameState.players[0].id);
      const player2SocketId = playerSockets.get(gameState.players[1].id);

      if (player1SocketId) {
        io.to(player1SocketId).emit('game_update', { gameState });
      }
      if (player2SocketId) {
        io.to(player2SocketId).emit('game_update', { gameState });
      }
    }
  });

  // Desconexão
  socket.on('disconnect', () => {
    const playerId = socketPlayers.get(socket.id);
    if (playerId) {
      gameManager.removePlayerFromWaiting(playerId);
      playerSockets.delete(playerId);
      playerGames.delete(playerId);
      socketPlayers.delete(socket.id);
      console.log(`Player ${playerId} disconnected`);
    }
  });
});

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';
httpServer.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access from other machines at: http://192.168.200.37:${PORT}`);
});
