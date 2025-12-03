import { GameState, Player, GameMove } from '../types/game.js';

export class Game {
  private gameState: GameState;

  constructor(gameId: string) {
    this.gameState = {
      id: gameId,
      players: [],
      board: Array(9).fill(null),
      currentPlayerIndex: 0,
      status: 'waiting',
      winner: null,
      winnerId: null,
    };
  }

  addPlayer(player: Player): void {
    if (this.gameState.players.length < 2) {
      this.gameState.players.push(player);
      
      if (this.gameState.players.length === 2) {
        this.startGame();
      }
    }
  }

  private startGame(): void {
    this.gameState.status = 'playing';
    this.gameState.currentPlayerIndex = 0;
    this.gameState.players[0].currentTurn = true;
    this.gameState.players[1].currentTurn = false;
  }

  makeMove(move: GameMove): boolean {
    const currentPlayer = this.gameState.players[this.gameState.currentPlayerIndex];
    
    if (currentPlayer.id !== move.playerId) {
      return false;
    }

    if (this.gameState.board[move.position] !== null) {
      return false;
    }

    const symbol = currentPlayer.symbol;
    this.gameState.board[move.position] = symbol;

    // Verificar vitória
    const winner = this.checkWinner();
    if (winner) {
      this.gameState.status = 'finished';
      this.gameState.winner = winner.symbol;
      this.gameState.winnerId = winner.id;
      this.gameState.players.forEach(p => p.currentTurn = false);
    } else if (this.isBoardFull()) {
      this.gameState.status = 'finished';
      this.gameState.winner = 'draw';
    } else {
      this.switchTurn();
    }

    return true;
  }

  private switchTurn(): void {
    this.gameState.currentPlayerIndex = 1 - this.gameState.currentPlayerIndex;
    this.gameState.players[0].currentTurn = this.gameState.currentPlayerIndex === 0;
    this.gameState.players[1].currentTurn = this.gameState.currentPlayerIndex === 1;
  }

  private checkWinner(): Player | null {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        this.gameState.board[a] &&
        this.gameState.board[a] === this.gameState.board[b] &&
        this.gameState.board[a] === this.gameState.board[c]
      ) {
        const symbol = this.gameState.board[a];
        return this.gameState.players.find(p => p.symbol === symbol) || null;
      }
    }

    return null;
  }

  private isBoardFull(): boolean {
    return this.gameState.board.every(cell => cell !== null);
  }

  getState(): GameState {
    return { ...this.gameState };
  }

  reset(): void {
    this.gameState.board = Array(9).fill(null);
    this.gameState.currentPlayerIndex = 0;
    this.gameState.status = 'playing';
    this.gameState.winner = null;
    this.gameState.winnerId = null;
    this.gameState.players[0].currentTurn = true;
    this.gameState.players[1].currentTurn = false;
  }
}
