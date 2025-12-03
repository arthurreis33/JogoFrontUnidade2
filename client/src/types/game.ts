// Tipos do Jogo
export interface Player {
  id: string;
  name: string;
  score: number;
  currentTurn: boolean;
  symbol: 'X' | 'O';
}

export interface GameState {
  id: string;
  players: Player[];
  board: (string | null)[];
  currentPlayerIndex: number;
  status: 'waiting' | 'playing' | 'finished';
  winner: string | null;
  winnerId: string | null;
}

export interface GameMove {
  playerId: string;
  gameId: string;
  position: number;
}

export interface JoinGameResponse {
  success: boolean;
  gameId?: string;
  player?: Player;
  game?: GameState;
  error?: string;
}

export interface GameUpdatePayload {
  type: 'move' | 'game_state' | 'player_joined' | 'game_finished';
  data: any;
}
