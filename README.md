# Jogo Multiplayer - Tic Tac Toe

Uma aplicação de Tic Tac Toe multiplayer em tempo real construída com React (frontend) e Node.js + Express + Socket.IO (backend).

## Arquitetura

- **Frontend**: React + TypeScript + Vite + Socket.IO Client
- **Backend**: Node.js + Express + Socket.IO + TypeScript
- **Comunicação**: WebSocket em tempo real

## Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── hooks/         # Custom hooks (useGameSocket)
│   │   ├── types/         # Tipos TypeScript compartilhados
│   │   ├── App.tsx        # Componente principal
│   │   └── main.tsx       # Entry point
│   └── package.json
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── game/          # Lógica do jogo (Game, GameManager)
│   │   ├── types/         # Tipos TypeScript
│   │   └── index.ts       # Servidor principal
│   └── package.json
└── package.json          # Workspace raiz
```

## Instalação

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Setup

```bash
# Instalar todas as dependências
npm run install-all

# Ou manualmente:
npm install
npm install --workspace=client
npm install --workspace=server
```

## Desenvolvimento

### Iniciar servidor e cliente

```bash
npm run dev
```

Isso inicia simultaneamente:
- Backend na porta 3000
- Frontend na porta 5173

### Build para produção

```bash
npm run build
```

## Como Jogar

1. **Iniciar a aplicação**: Abra http://localhost:5173 em dois navegadores diferentes (ou dois computadores)
2. **Inserir nome**: Digite seu nome em ambos os clientes
3. **Aguardar adversário**: O primeiro jogador a se conectar aguardará, o segundo iniciará a partida
4. **Fazer jogadas**: Clique nas células disponíveis durante seu turno
5. **Resultado**: O jogo termina quando há um vencedor (3 em linha) ou empate
6. **Nova partida**: Clique em "Nova Partida" para jogar novamente contra o mesmo oponente

## Fluxo do Jogo

1. Jogador entra na fila de espera
2. Quando 2 jogadores estão na fila, um novo jogo é criado
3. Cada jogador recebe o ID e o estado do jogo
4. Jogadores alternam turnos fazendo jogadas
5. Servidor valida as jogadas e atualiza estado
6. Estado é enviado para ambos os clientes via WebSocket
7. Quando jogo termina, jogadores podem iniciar nova partida

## Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Vite
- Socket.IO Client
- CSS3

### Backend
- Node.js
- Express
- Socket.IO
- TypeScript
- CORS

## Scripts

### Workspace Root
- `npm run dev`: Inicia servidor e cliente
- `npm run build`: Build de ambos frontend e backend
- `npm run install-all`: Instala dependências de todos os workspaces

### Client
- `npm run dev`: Inicia Vite dev server
- `npm run build`: Build para produção
- `npm run preview`: Preview do build

### Server
- `npm run dev`: Inicia servidor com watch mode (tsx watch)
- `npm run build`: Compila TypeScript
- `npm start`: Inicia servidor compilado

## Componentes

### Cliente
- **Board**: Renderiza o tabuleiro 3x3
- **Game**: Tela principal do jogo com informações dos jogadores
- **Lobby**: Tela de entrada com campo para nome

### Hook
- **useGameSocket**: Gerencia comunicação com servidor via Socket.IO

### Servidor
- **Game**: Classe que implementa a lógica do Tic Tac Toe
- **GameManager**: Gerencia múltiplos jogos e fila de espera

## Variáveis de Ambiente

### Servidor
- `PORT`: Porta do servidor (padrão: 3000)

## Portas Padrão

- Backend: 3000
- Frontend: 5173

## Melhorias Futuras

- [ ] Sistema de ranking/pontuação persistente
- [ ] Histórico de partidas
- [ ] Salas com senha
- [ ] Chat entre jogadores
- [ ] Diferentes níveis de dificuldade
- [ ] Bot AI para jogar contra computador
- [ ] Mobile responsivo otimizado
- [ ] Autenticação de usuários

## Licença

MIT
