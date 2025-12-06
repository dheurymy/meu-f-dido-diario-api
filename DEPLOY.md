# 🚀 Deploy na Vercel

## Passo a Passo

### 1. Inicializar Git e publicar no GitHub

```bash
# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - API Node.js com autenticação"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/seu-usuario/seu-repositorio.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### 2. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Importe seu repositório do GitHub
5. Configure as variáveis de ambiente:

#### Variáveis de Ambiente na Vercel:

```
PORT=5000
MONGODB_URI=mongodb+srv://dheurymy:dheurymy@dheurymy.gsbco.mongodb.net/meu-f#dido-diario
JWT_SECRET=dheurymy
JWT_EXPIRE=7d
SESSION_SECRET=dheurymy
```

6. Clique em "Deploy"

### 3. Após o Deploy

A Vercel vai gerar uma URL como: `https://seu-projeto.vercel.app`

### 4. Testar a API

```bash
# Teste de saúde
GET https://seu-projeto.vercel.app/

# Cadastro
POST https://seu-projeto.vercel.app/api/auth/cadastro

# Login
POST https://seu-projeto.vercel.app/api/auth/login

# Perfil (requer token)
GET https://seu-projeto.vercel.app/api/auth/me
```

## 📝 Comandos Git Úteis

```bash
# Ver status
git status

# Adicionar mudanças
git add .

# Commit
git commit -m "Sua mensagem"

# Enviar para GitHub
git push

# Ver histórico
git log --oneline
```

## 🔄 Atualizações Futuras

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

A Vercel vai fazer o deploy automático! ✨
