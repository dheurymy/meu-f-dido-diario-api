# API Node.js com Express e MongoDB

API REST para autenticação de usuários com Node.js, Express e MongoDB.

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Bcrypt
- CORS

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster e obtenha a string de conexão
3. Renomeie o arquivo `.env.example` para `.env`
4. Configure as variáveis de ambiente:

```env
PORT=3000
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRE=7d
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

#### Cadastro
```http
POST /api/auth/cadastro
Content-Type: application/json

{
  "nome": "Seu Nome",
  "email": "email@exemplo.com",
  "senha": "suasenha123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "email@exemplo.com",
  "senha": "suasenha123"
}
```

#### Obter dados do usuário (requer autenticação)
```http
GET /api/auth/me
Authorization: Bearer seu_token_jwt
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
│   │   └── database.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com JWT
- ✅ Criptografia de senhas com bcrypt
- ✅ Validação de dados
- ✅ Middleware de autenticação
- ✅ Proteção de rotas privadas
