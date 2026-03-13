# 📦 Sistema de Controle de Estoque

> Aplicação web local para gerenciamento de estoque de loja, construída com Next.js, TypeScript, Tailwind CSS e SQLite via Prisma ORM.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Rodando Localmente](#rodando-localmente)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Ambiente via Docker (Futuro)](#ambiente-via-docker-futuro)
- [Contribuindo](#contribuindo)

---

## Visão Geral

Sistema de controle de estoque para uso interno de loja física. O objetivo do MVP é permitir que usuários autenticados cadastrem, visualizem e removam produtos do estoque de forma simples e confiável.

**Funcionalidades do MVP (Sprint 01–03):**

| #   | Funcionalidade                     | Status                |
| --- | ---------------------------------- | --------------------- |
| 1   | Criação e autenticação de usuários | 🔄 Em desenvolvimento |
| 2   | Cadastro de produtos               | 🔄 Em desenvolvimento |
| 3   | Exclusão de produtos               | 🔄 Em desenvolvimento |

---

## Stack Tecnológica

| Camada         | Tecnologia                                  | Versão recomendada |
| -------------- | ------------------------------------------- | ------------------ |
| Framework      | [Next.js](https://nextjs.org/) (App Router) | `14.x`             |
| Linguagem      | TypeScript                                  | `5.x`              |
| Estilização    | Tailwind CSS                                | `3.x`              |
| Banco de dados | SQLite                                      | —                  |
| ORM            | [Prisma](https://www.prisma.io/)            | `5.x`              |
| Autenticação   | NextAuth.js _(planejado)_                   | `5.x`              |

---

## Estrutura de Pastas

```
/
├── prisma/
│   ├── schema.prisma          # Definição dos modelos do banco de dados
│   └── migrations/            # Histórico de migrações gerado pelo Prisma
│
├── src/
│   ├── app/                   # App Router do Next.js (rotas = pastas)
│   │   ├── (auth)/            # Grupo de rotas de autenticação (sem layout padrão)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/       # Grupo de rotas protegidas (com layout de dashboard)
│   │   │   ├── layout.tsx     # Layout compartilhado: sidebar, header
│   │   │   └── products/
│   │   │       ├── page.tsx   # Listagem de produtos
│   │   │       └── new/
│   │   │           └── page.tsx
│   │   ├── api/               # Route Handlers (endpoints da API)
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   └── products/
│   │   │       ├── route.ts        # GET /api/products, POST /api/products
│   │   │       └── [id]/
│   │   │           └── route.ts   # GET, PUT, DELETE /api/products/:id
│   │   ├── layout.tsx         # Layout raiz (html, body, providers)
│   │   └── page.tsx           # Página inicial (redirect para /login ou /products)
│   │
│   ├── components/            # Componentes React reutilizáveis
│   │   ├── ui/                # Componentes "burros" — apenas apresentação, sem lógica de negócio
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Table.tsx
│   │   └── features/          # Componentes "inteligentes" — conectados a dados e serviços
│   │       ├── ProductCard.tsx
│   │       └── ProductForm.tsx
│   │
│   ├── lib/                   # Configurações e clientes de bibliotecas externas
│   │   ├── prisma.ts          # Singleton do PrismaClient (evita múltiplas conexões em dev)
│   │   └── auth.ts            # Configuração do NextAuth
│   │
│   ├── services/              # Regras de negócio e acesso a dados
│   │   │                      # Cada arquivo isola as operações de um recurso.
│   │   │                      # As páginas/API nunca chamam o Prisma diretamente.
│   │   ├── user.service.ts    # createUser, getUserByEmail, etc.
│   │   └── product.service.ts # createProduct, deleteProduct, listProducts, etc.
│   │
│   ├── types/                 # Tipos e interfaces TypeScript globais do projeto
│   │   ├── user.types.ts
│   │   └── product.types.ts
│   │
│   └── utils/                 # Funções utilitárias puras (sem efeitos colaterais)
│       ├── formatCurrency.ts  # Formatação de preços (ex: 1999 → "R$ 19,99")
│       └── validators.ts      # Validações reutilizáveis (ex: isValidSKU)
│
├── .env                       # Variáveis de ambiente locais (NÃO versionar)
├── .env.example               # Template das variáveis necessárias (versionar)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

> **Por que `services/` em vez de chamar o Prisma direto nas rotas?**
> Isolar o acesso a dados em services facilita testes unitários (você mocka o service, não o Prisma), troca de ORM no futuro e reutilização da mesma lógica em diferentes endpoints.

---

## Pré-requisitos

Antes de começar, garanta que seu ambiente possui:

- **Node.js** `>= 18.17.0` — [Download](https://nodejs.org/)
- **npm** `>= 9.x` (ou `pnpm`/`yarn` de sua preferência)
- **Git** — [Download](https://git-scm.com/)

Para verificar suas versões:

```bash
node -v
npm -v
git --version
```

---

## Rodando Localmente

Siga os passos abaixo na ordem exata:

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/controle-estoque.git
cd controle-estoque
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações (veja a seção [Variáveis de Ambiente](#variáveis-de-ambiente)).

### 4. Gere o Prisma Client

Este passo gera os tipos TypeScript a partir do `schema.prisma`. **Deve ser executado após qualquer alteração no schema.**

```bash
npx prisma generate
```

### 5. Aplique o schema ao banco de dados

Para desenvolvimento, usamos `db push` — ele sincroniza o schema com o banco sem criar arquivos de migração, ideal para iteração rápida no MVP.

```bash
npx prisma db push
```

> ⚠️ **Nota:** Em produção ou quando o histórico de migrações for importante (staging, times), prefira `npx prisma migrate dev` para manter o rastreamento de mudanças.

### 6. (Opcional) Abra o Prisma Studio

Interface visual para inspecionar e editar dados do banco diretamente:

```bash
npx prisma studio
```

### 7. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Caminho para o arquivo do banco SQLite.
# O prefixo "file:" é obrigatório para o Prisma reconhecer o provider SQLite.
DATABASE_URL="file:./prisma/dev.db"

# Secret usado para assinar os tokens de sessão do NextAuth.
# Gere um valor seguro com: openssl rand -base64 32
NEXTAUTH_SECRET="seu-secret-aqui"

# URL base da aplicação (necessário para callbacks do NextAuth)
NEXTAUTH_URL="http://localhost:3000"
```

> O arquivo `.env.example` (sem valores reais) deve sempre ser mantido atualizado e versionado no Git. O `.env` real **nunca** deve ser commitado.

---

## Scripts Disponíveis

| Comando                  | Descrição                                           |
| ------------------------ | --------------------------------------------------- |
| `npm run dev`            | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build`          | Gera o build de produção                            |
| `npm run start`          | Inicia o servidor em modo produção (requer build)   |
| `npm run lint`           | Executa o ESLint em todo o projeto                  |
| `npx prisma generate`    | Regenera o Prisma Client após mudanças no schema    |
| `npx prisma db push`     | Sincroniza o schema com o banco (dev)               |
| `npx prisma migrate dev` | Cria e aplica uma migração nomeada (staging/prod)   |
| `npx prisma studio`      | Abre a interface visual do banco de dados           |

---

## Ambiente via Docker (Futuro)

> Esta seção documenta a intenção de suporte a Docker para padronizar o ambiente entre desenvolvedores e pipelines de CI.

Quando o `Dockerfile` e o `docker-compose.yml` forem adicionados ao projeto, o ambiente completo poderá ser iniciado com um único comando:

```bash
# Builda a imagem e sobe os containers em background
docker compose up --build -d

# Aplica o schema no banco dentro do container
docker compose exec app npx prisma db push

# Acompanha os logs da aplicação
docker compose logs -f app

# Para os containers
docker compose down
```

**Estrutura planejada dos serviços no `docker-compose.yml`:**

| Serviço | Descrição         | Porta  |
| ------- | ----------------- | ------ |
| `app`   | Aplicação Next.js | `3000` |

> Como o banco é SQLite (arquivo local), não há serviço de banco separado no Docker. O volume do container mapeará o arquivo `.db` para o host, garantindo persistência entre restarts.

---

## Contribuindo

1. Crie uma branch a partir de `main`: `git checkout -b feature/nome-da-feature`
2. Faça seus commits com mensagens descritivas seguindo [Conventional Commits](https://www.conventionalcommits.org/)
3. Abra um Pull Request descrevendo **o quê** foi feito e **por quê**
4. Aguarde a revisão de código antes do merge

---

_Documentação mantida pela equipe de desenvolvimento. Última atualização: Sprint 01._
