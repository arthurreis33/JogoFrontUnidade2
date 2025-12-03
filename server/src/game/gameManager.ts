import { Game } from './game.js';
import { GameState, Player } from '../types/game.js';

export class GameManager {
  private games: Map<string, Game> = new Map();
  private waitingPlayers: Map<string, Player> = new Map();

  createGame(): string {
    const gameId = this.generateId();
    this.games.set(gameId, new Game(gameId));
    return gameId;
  }

  addPlayerToWaiting(player: Player): void {
    this.waitingPlayers.set(player.id, player);
  }

  removePlayerFromWaiting(playerId: string): void {
    this.waitingPlayers.delete(playerId);
  }

  joinGame(gameId: string, player: Player): boolean {
    const game = this.games.get(gameId);
    if (!game) {
      return false;
    }

    game.addPlayer(player);
    this.removePlayerFromWaiting(player.id);
    return true;
  }

  getGame(gameId: string): GameState | null {
    const game = this.games.get(gameId);
    return game ? game.getState() : null;
  }

  makeMove(gameId: string, playerId: string, position: number): { success: boolean; state?: GameState } {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false };
    }

    const success = game.makeMove({ gameId, playerId, position });
    return {
      success,
      state: game.getState(),
    };
  }

  resetGame(gameId: string): void {
    const game = this.games.get(gameId);
    if (game) {
      game.reset();
    }
  }

  removeGame(gameId: string): void {
    this.games.delete(gameId);
  }

  getWaitingPlayers(): Player[] {
    return Array.from(this.waitingPlayers.values());
  }

  getPlayerCount(gameId: string): number {
    const game = this.games.get(gameId);
    return game ? game.getState().players.length : 0;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}
