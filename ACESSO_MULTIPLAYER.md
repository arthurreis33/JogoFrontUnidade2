# 🎮 Como Acessar o Jogo Multiplayer

## Informações do Servidor

- **IP do Servidor**: `192.168.200.37`
- **Porta Frontend**: `5173`
- **Porta Backend**: `3000`

## Para Jogar na Mesma Máquina do Servidor

Abra o navegador e acesse:
```
http://localhost:5173
```

## Para Jogar em Outro Computador na Mesma Rede

1. Certifique-se de que está **conectado à mesma rede WiFi** que o servidor
2. Abra o navegador e acesse:
```
http://192.168.200.37:5173
```

3. A página carregará e se conectará automaticamente ao servidor

## Para Testar Multiplayer na Mesma Máquina

Abra 2 abas do navegador:
- **Aba 1**: `http://localhost:5173`
- **Aba 2**: `http://192.168.200.37:5173`

Ambas se conectarão ao servidor e você poderá jogar contra si mesmo!

## Troubleshooting

### ❌ Página não carrega
- Verifique se está na mesma rede WiFi
- Tente fazer ping no servidor: `ping 192.168.200.37`
- Verifique se o firewall não está bloqueando as portas 3000 e 5173

### ❌ Conecta mas não recebe atualizações
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Recarregue a página (F5 ou Ctrl+R)
- Verifique a console do navegador (F12) para erros

### ❌ Firewall bloqueando
**Windows:**
- Vá em Configurações > Segurança do Windows > Firewall
- Clique em "Permitir um aplicativo através do firewall"
- Adicione Node.js às exceções

## Como Jogar

1. Abra o jogo em 2 computadores diferentes
2. Em cada um, clique em "Entrar na Fila" e digite seu nome
3. Assim que 2 jogadores estiverem na fila, o jogo começa automaticamente
4. Clique nas posições do tabuleiro para fazer suas jogadas
5. O jogo alterna automaticamente entre os jogadores

**Boa diversão! 🎯**
