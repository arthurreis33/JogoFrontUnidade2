# 🚀 Guia de Deploy no Render

## Passo 1: Acessar Render.com

1. Vá para [render.com](https://render.com)
2. Clique em "Sign up" e crie uma conta com GitHub
3. Autorize o Render a acessar seus repositórios

## Passo 2: Criar um novo Blueprint

1. No dashboard do Render, clique em **"New +"**
2. Selecione **"Blueprint"**
3. Conecte seu repositório GitHub `JogoFrontUnidade2`
4. Selecione a branch `main`
5. Clique em **"Connect"**

## Passo 3: Configurar o Blueprint

1. O Render detectará automaticamente o arquivo `render.yaml`
2. Você verá 2 serviços:
   - ✅ **jogo-server** (Node.js backend)
   - ✅ **jogo-client** (React frontend)
3. Clique em **"Create Blueprint"**

## Passo 4: Deploy Automático

1. Render começará a fazer deploy automaticamente
2. Espere os dois serviços ficarem "Live" (pode levar 5-10 minutos)
3. Você receberá URLs como:
   - Frontend: `https://jogo-client.onrender.com`
   - Backend: `https://jogo-server.onrender.com`

## Passo 5: Testar

1. Abra a URL do frontend em 2 navegadores diferentes (ou abas)
2. Clique em "Entrar na Fila" nos dois
3. O jogo deve começar automaticamente!

## 🔗 URLs Geradas

Após o deploy bem-sucedido:
- **Frontend**: `https://seu-projeto-client.onrender.com`
- **Backend**: `https://seu-projeto-server.onrender.com`

## ⚙️ Variáveis de Ambiente (se necessário)

Se precisar adicionar variáveis:
1. Vá para o serviço do backend no Render
2. Clique em **"Environment"**
3. Adicione as variáveis necessárias (como `DATABASE_URL`, etc.)

## 🔄 Deploy Automático

A cada `git push` na branch `main`:
1. Render detecta o novo commit
2. Refaz o build automaticamente
3. Deploy é feito em poucos minutos

## ⚠️ Notas Importantes

- O plano gratuito do Render coloca serviços em sleep após 15 min de inatividade
- Para produção real, considere um plano pago
- O Socket.IO funciona perfeitamente no Render

## 📝 Próximos Passos

Se o deploy tiver sucesso:
1. ✅ Compartilhe a URL com amigos
2. ✅ Jogue multiplayer de qualquer lugar do mundo!
3. ✅ Considere melhorias como banco de dados para ranqueamento

---

**Dúvidas?** Cheque a aba "Logs" do seu serviço no Render para ver erros.
