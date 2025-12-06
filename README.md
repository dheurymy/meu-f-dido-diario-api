# API Node.js com Express e MongoDB

API REST para autenticação de usuários e gerenciamento de diário pessoal com Node.js, Express e MongoDB.

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Bcryptjs
- CORS

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster e obtenha a string de conexão
3. Configure as variáveis de ambiente no arquivo `.env`:

```env
PORT=5000
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRE=7d
SESSION_SECRET=sua_chave_de_sessao
```

## 🏃 Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 📍 Rotas da API

### Autenticação

#### Verificar disponibilidade de usuário
```http
GET /api/auth/verificar-usuario/:usuario
```

**Resposta:**
```json
{
  "sucesso": true,
  "disponivel": true,
  "mensagem": "Usuário disponível"
}
```

#### Cadastro
```http
POST /api/auth/cadastro
Content-Type: application/json

{
  "nome": "Seu Nome",
  "usuario": "seususario",
  "email": "email@exemplo.com",
  "senha": "suasenha123"
}
```

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Usuário cadastrado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "...",
    "nome": "Seu Nome",
    "usuario": "seususario",
    "email": "email@exemplo.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "seususario",
  "senha": "suasenha123"
}
```

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "...",
    "nome": "Seu Nome",
    "usuario": "seususario",
    "email": "email@exemplo.com"
  }
}
```

#### Obter dados do usuário (requer autenticação)
```http
GET /api/auth/me
Authorization: Bearer seu_token_jwt
```

**Resposta:**
```json
{
  "sucesso": true,
  "usuario": {
    "id": "...",
    "nome": "Seu Nome",
    "usuario": "seususario",
    "email": "email@exemplo.com",
    "criadoEm": "2025-12-06T00:00:00.000Z"
  }
}
```

### Diário (requer autenticação)

#### Listar todas as entradas
```http
GET /diary/entries
Authorization: Bearer seu_token_jwt
```

**Resposta:**
```json
{
  "sucesso": true,
  "quantidade": 2,
  "dados": [
    {
      "_id": "...",
      "usuario": "...",
      "titulo": "Meu primeiro dia",
      "conteudo": "Hoje foi um dia incrível...",
      "data": "2025-12-06T00:00:00.000Z",
      "humor": "feliz",
      "tags": ["viagem", "felicidade"],
      "privado": true,
      "createdAt": "2025-12-06T00:00:00.000Z",
      "updatedAt": "2025-12-06T00:00:00.000Z"
    }
  ]
}
```

#### Buscar entrada por ID
```http
GET /diary/entries/:id
Authorization: Bearer seu_token_jwt
```

**Resposta:**
```json
{
  "sucesso": true,
  "dados": {
    "_id": "...",
    "titulo": "Meu primeiro dia",
    "conteudo": "Hoje foi um dia incrível...",
    "data": "2025-12-06T00:00:00.000Z",
    "humor": "feliz",
    "tags": ["viagem", "felicidade"],
    "privado": true
  }
}
```

#### Criar nova entrada
```http
POST /diary/entries
Authorization: Bearer seu_token_jwt
Content-Type: application/json

{
  "titulo": "Meu primeiro dia",
  "conteudo": "Hoje foi um dia incrível...",
  "data": "2025-12-06T00:00:00.000Z",
  "humor": "feliz",
  "tags": ["viagem", "felicidade"],
  "privado": true
}
```

**Campos obrigatórios:** `titulo`, `conteudo`  
**Campos opcionais:** `data` (padrão: agora), `humor` (padrão: "outro"), `tags`, `privado` (padrão: true)

**Opções de humor:** `feliz`, `triste`, `ansioso`, `calmo`, `animado`, `cansado`, `outro`

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Entrada criada com sucesso",
  "dados": {
    "_id": "...",
    "usuario": "...",
    "titulo": "Meu primeiro dia",
    "conteudo": "Hoje foi um dia incrível...",
    "data": "2025-12-06T00:00:00.000Z",
    "humor": "feliz",
    "tags": ["viagem", "felicidade"],
    "privado": true
  }
}
```

#### Atualizar entrada
```http
PUT /diary/entries/:id
Authorization: Bearer seu_token_jwt
Content-Type: application/json

{
  "titulo": "Título atualizado",
  "conteudo": "Conteúdo atualizado...",
  "humor": "animado"
}
```

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Entrada atualizada com sucesso",
  "dados": {
    "_id": "...",
    "titulo": "Título atualizado",
    "conteudo": "Conteúdo atualizado...",
    "humor": "animado"
  }
}
```

#### Deletar entrada
```http
DELETE /diary/entries/:id
Authorization: Bearer seu_token_jwt
```

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Entrada deletada com sucesso"
}
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Após fazer login ou cadastro, você receberá um token que deve ser enviado no header `Authorization` com o prefixo `Bearer`:

```
Authorization: Bearer seu_token_aqui
```

## 📝 Estrutura do Projeto

```
App01 - API/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do MongoDB
│   ├── controllers/
│   │   ├── authController.js    # Controladores de autenticação
│   │   ├── userController.js    # Controladores de usuário
│   │   └── diaryController.js   # Controladores de diário
│   ├── middlewares/
│   │   └── auth.js              # Middleware de autenticação JWT
│   ├── models/
│   │   ├── User.js              # Modelo de usuário
│   │   └── Entry.js             # Modelo de entrada do diário
│   ├── routes/
│   │   ├── authRoutes.js        # Rotas de autenticação
│   │   └── diaryRoutes.js       # Rotas de diário
│   └── server.js                # Servidor Express
├── .env                         # Variáveis de ambiente (não commitado)
├── .env.example                 # Exemplo de variáveis
├── .gitignore
├── package.json
├── vercel.json                  # Configuração Vercel
├── DEPLOY.md                    # Guia de deploy
└── README.md
```

## 🎯 Funcionalidades

### Autenticação
- ✅ Verificação de disponibilidade de username
- ✅ Cadastro de usuários com validação
- ✅ Login com username e senha
- ✅ Autenticação JWT
- ✅ Criptografia de senhas com bcrypt
- ✅ Validação de dados (email, username único)
- ✅ Middleware de autenticação
- ✅ Proteção de rotas privadas

### Diário
- ✅ Criar entradas de diário
- ✅ Listar todas as entradas do usuário
- ✅ Buscar entrada específica por ID
- ✅ Atualizar entradas existentes
- ✅ Deletar entradas
- ✅ Filtro por usuário (apenas vê suas próprias entradas)
- ✅ Suporte para humor, tags e privacidade
- ✅ Ordenação por data (mais recentes primeiro)

### Deploy
- ✅ Pronto para deploy na Vercel

## 🚀 Deploy

Veja o arquivo [DEPLOY.md](./DEPLOY.md) para instruções completas de deploy no GitHub e Vercel.

## 📄 Licença

ISC
