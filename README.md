Perfeito 🚀
Com base no **escopo do projeto**, nos **scripts do backend** e no **setup do frontend com React Router 7**, aqui vai um `README.md` inicial para guiar o time no uso da aplicação:

---

# 📚 Plataforma EBD

Sistema para gestão da Escola Bíblica Dominical (EBD), com **backend em Node.js + Prisma + PostgreSQL** e **frontend em React Router 7**.

---

## ⚙️ Requisitos

- **Node.js** ≥ 20
- **npm** ou **pnpm/yarn**
- **PostgreSQL** ≥ 15
- (Opcional) **Redis** se usar cache/sessões

---

## 📂 Estrutura

- `server-ebd/` → Backend (API REST em Express + Prisma)
- `client/` → Frontend (React Router 7 + Tailwind + Radix UI)

---

## 🔧 Configuração Backend

### 1. Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `server-ebd/`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ebd_db"
PORT=3333

# Usuário inicial
ADMIN_EMAIL=admin@ebd.com
ADMIN_PASSWORD=admin123
JWT_SECRET=sua_chave_segura
REDIS_URL=redis://localhost:6379
```

### 2. Instalar dependências

```bash
cd server-ebd
npm install
```

### 3. Gerar banco + seed inicial

No primeiro uso:

```bash
npm run prisma:dev
```

Esse comando:

- Executa as migrations
- Popula dados iniciais (usuário admin, níveis e classes)

Em produção:

```bash
npm run build
npm run prisma:deploy
```

### 4. Rodar servidor

Modo desenvolvimento:

```bash
npm run dev
```

Modo produção:

```bash
npm run start
```

A API estará disponível em:
👉 `http://localhost:3333`

---

## 🎨 Configuração Frontend

### 1. Instalar dependências

```bash
cd client
npm install
```

### 2. Variáveis de ambiente

Crie o arquivo `.env` dentro de `client/`:

```env
VITE_API_URL=http://localhost:3333
```

### 3. Rodar aplicação

Modo desenvolvimento:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
npm start
```

A aplicação estará em:
👉 `http://localhost:5173` (dev)
👉 `http://localhost:3000` (prod)

---

## 📖 Scripts úteis

### Backend (`server-ebd`)

- `npm run dev` → roda servidor em hot-reload (tsx)
- `npm run build` → gera código compilado + client Prisma
- `npm run start` → sobe servidor em produção (dist)
- `npm run prisma:dev` → executa migrations + seed (desenvolvimento)
- `npm run prisma:deploy` → executa migrations + seed (produção)
- `npm run typecheck` → checa tipos TypeScript

### Frontend (`client`)

- `npm run dev` → roda servidor React Router 7 em dev
- `npm run build` → gera build de produção
- `npm start` → serve aplicação buildada
- `npm run typecheck` → gera tipos e valida TS

---

## 🚀 Fluxo de desenvolvimento

1. Rodar backend (`server-ebd`)
2. Rodar frontend (`client`)
3. Login com usuário admin criado no seed (`admin@ebd.com / admin123`)
4. Criar níveis, classes, professores, alunos etc.

---

## 🛡️ Segurança

- Senhas armazenadas com **bcrypt**
- Tokens JWT para professores/monitores
- Alunos acessam via `access_key` (UUID)
- Dados pessoais criptografados (AES-256 planejado)
