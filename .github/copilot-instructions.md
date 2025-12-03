# Instruções do Projeto - Jogo Multiplayer React

Este é um projeto fullstack de um jogo Tic Tac Toe multiplayer em tempo real.

## Estrutura do Projeto

- **client/**: Frontend React com Vite
- **server/**: Backend Node.js com Express e Socket.IO
- **Comunicação**: WebSocket (Socket.IO) em tempo real

## Tecnologias Principais

- React 18 + TypeScript
- Node.js + Express
- Socket.IO para comunicação real-time
- Vite para bundling

## Desenvolvimento

Para desenvolver neste projeto:

1. Manter a separação entre client e server
2. Sempre sincronizar tipos compartilhados em ambos
3. Usar Socket.IO para comunicação bidirecional
4. Validar todas as jogadas no servidor

## Dependências Críticas

- socket.io-client (frontend)
- socket.io (backend)
- express (backend)
- react (frontend)
- typescript (ambos)

## Pontos de Atenção

- Lógica do jogo roda NO SERVIDOR
- Frontend apenas renderiza e captura input
- Validação de movimentos é feita no servidor
- Sincronização de estado via WebSocket
