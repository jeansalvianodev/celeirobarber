
# 💈 CeleiroBarber

Sistema completo para gestão de agendamentos de barbeiros, com frontend em **Next.js (App Router)**, backend em **Express + Prisma**, e autenticação via **NextAuth com login do Google**.

---

## 🧠 Tecnologias utilizadas

### Frontend (Next.js + App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js (login social)
- App Router (`/app`)
- Fetch API com `NEXT_PUBLIC_API_URL`
- Componentes reutilizáveis
- Responsivo e com suporte a dark mode

### Backend (Node.js + Express)
- Express
- Prisma ORM
- PostgreSQL
- CORS para comunicação com frontend

---

## ⚙️ Estrutura do Projeto

```
celeirobarber/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                # Página inicial
│   │   ├── barbeiros/
│   │   │   ├── [id]/page.tsx       # Página de detalhes do barbeiro
│   │   │   └── page.tsx            # Listagem + busca
│   │   ├── login/                  # Rota de login com Google
│   │   └── ...
│   ├── _components/                # Componentes reutilizáveis
│   ├── _lib/                       # Hooks, contextos, etc
│   ├── api.ts                      # Integração com backend via fetch()
│   ├── styles/                     # Tailwind + globals
│   └── ...
├── backend/
│   ├── index.ts                    # Servidor Express
│   ├── prisma/
│   │   └── schema.prisma           # Esquema do banco de dados
│   └── ...
└── README.md
```

---

## Como rodar o projeto localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL local (ou outro banco configurado no `.env`)
- Yarn ou npm

---

### Clonando o projeto

```bash
git clone https://github.com/seu-usuario/celeirobarber.git
cd celeirobarber
```

---

### Backend

```bash
cd backend
cp .env.example .env

# Edite seu .env com DATABASE_URL do Prisma
# Exemplo:
# DATABASE_URL="postgresql://user:password@localhost:5432/celeiro"

yarn
npx prisma migrate dev
yarn dev
```

Servidor será iniciado em `http://localhost:3333`.

---

### Frontend

```bash
cd frontend
cp .env.example .env

# Edite seu .env:
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=qualquer-string-secreta
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
# NEXT_PUBLIC_API_URL=http://localhost:3333

yarn
yarn dev
```

Acesse o frontend em `http://localhost:3000`.

---

## Autenticação com Google (NextAuth)

1. Acesse: [https://console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto → OAuth 2.0
3. Configure as **URLs de redirecionamento**:
   - `http://localhost:3000/api/auth/callback/google`
4. Copie o **Client ID** e **Client Secret**
5. Preencha no `.env` do frontend.

---

## Funcionalidades

- [x] Autenticação com Google (NextAuth)
- [x] Listagem de barbeiros
- [x] Página de detalhes do barbeiro (imagem, descrição, serviços)
- [x] Integração frontend-backend com Fetch API
- [x] Backend com Prisma (GET `/barbeiros`, `/servicos`, `/barbeiros/:id`)
- [x] Estrutura limpa e modular
- [x] Suporte a busca por nome e serviços
- [x] UI responsiva com Tailwind e ícones Lucide

---

## Em andamento / próximos passos

- [ ] Dashboard administrativo
- [ ] Agendamentos com autenticação
- [ ] CRUD de serviços e barbeiros via painel admin
- [ ] Deploy frontend (Vercel) e backend (Render, Railway, etc)
- [ ] Integração com WhatsApp ou notificações

---



