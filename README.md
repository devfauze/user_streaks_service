# 📌 Streaks - TheNews API

Bem-vindo à API do Streaks - TheNews! Este projeto fornece endpoints para autenticação, gerenciamento de amigos e rastreamento de streaks.

## 🚀 Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/streaks-thenews.git
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Inicie o servidor:
   ```sh
   npm run dev
   ```

## 🔗 Endpoints

### 📌 **Autenticação** (`auth-routes.ts`)

| Método | Rota        | Descrição                  |
| ------ | ----------- | -------------------------- |
| POST   | `/register` | Registra um novo usuário   |
| POST   | `/login`    | Faz login e retorna um JWT |

### 👥 **Sistema de Amigos** (`friendship-routes.ts`)

| Método | Rota                      | Descrição                   |
| ------ | ------------------------- | --------------------------- |
| POST   | `/friend-request`         | Envia um pedido de amizade  |
| POST   | `/accept-friend-request`  | Aceita um pedido de amizade |
| POST   | `/decline-friend-request` | Recusa um pedido de amizade |
| DELETE | `/remove-friend`          | Remove um amigo da lista    |

### 🏆 **Leaderboard** (`leaderboard-routes.ts`)

| Método | Rota              | Descrição                                                                          |
| ------ | ------------------| ---------------------------------------------------------------------------------- |
| GET   | `/userId`          | Busca o leaderboard e utiliza id do usuário para buscar amigos (autenticado)       |

### 🔥 **Streaks** (`streak-routes.ts`)

| Método | Rota              | Descrição                              |
| ------ | ------------------| -------------------------------------- |
| POST   | `/track`          | Registra um streak (autenticado)       |
| GET   | `/:email`          | Streak do usuário  (autenticado)       |
| GET   | `/:userId/history` | Pega histórico de streak (autenticado) |
