
# Visão Geral do Projeto

## Nome do Projeto: SARE - Backend

### Objetivo
Este repositório contém a implementação do backend para o sistema de agendamento SARE. Ele será responsável por gerenciar as funcionalidades principais, como autenticação, comunicação com o banco de dados e exposição de APIs RESTful.

---

## Tecnologias Utilizadas

### Backend (Server-side)
- **Linguagem de Programação**: Node.js (JavaScript ou TypeScript).
- **Framework**: NestJS (preferencialmente com TypeScript).
- **Autenticação**: JWT (JSON Web Tokens) + OAuth.
- **Banco de Dados**: PostgreSQL.
- **ORM/ODM**: Prisma.
- **API**: RESTful.

---

## Estrutura de Pastas do Backend

```plaintext
/backend
│
├── /src                # Código-fonte da API
│   ├── /controllers    # Funções responsáveis pelas rotas
│   ├── /models         # Definições de modelos (ORM/ODM)
│   ├── /routes         # Definições das rotas da API
│   ├── /services       # Lógica de negócio
│   ├── /middleware     # Funções de middleware (ex.: autenticação)
│   ├── /utils          # Funções auxiliares
│   ├── /config         # Arquivos de configuração (banco de dados, autenticação, etc)
│   └── /validators     # Validações de dados (ex.: validação de input)
│
├── .env                # Variáveis de ambiente
├── package.json        # Dependências do projeto Node.js
├── tsconfig.json       # Configurações para TypeScript (se aplicável)
└── Dockerfile          # Arquivo para construir a imagem Docker
```

---

## Boas Práticas de Organização de Projetos e Codificação

### Estrutura Geral de Diretórios
- **src/**: Contém o código-fonte principal da API.
- **tests/**: Arquivos para testes automatizados.
- **docs/**: Documentação e outros arquivos auxiliares.

### Organização por Função
- **controllers/**: Funções responsáveis por receber requisições HTTP e enviar respostas.
- **services/**: Contém a lógica de negócio principal, separada dos controladores.
- **models/**: Define os esquemas do banco de dados utilizando o Prisma ORM.
- **middleware/**: Funções que interceptam e processam requisições antes de chegarem aos controladores.

---

## Convenções de Nomenclatura

### Padrões Recomendados
1. **Arquivos**:
   - Use `kebab-case` para arquivos JavaScript ou TypeScript (ex.: `user-controller.ts`).
   - Use `PascalCase` para classes e modelos (ex.: `UserModel.ts`).

2. **Pastas**:
   - Utilize `kebab-case` para nomes de pastas (ex.: `controllers`, `middleware`).

3. **Constantes**:
   - Use `UPPER_CASE` para constantes (ex.: `DATABASE_URL`).

---

## Estilo de Codificação

1. **Ponto e Vírgula**:
   - Sempre inclua `;` no final das linhas para evitar ambiguidades no JavaScript ou TypeScript:
     ```typescript
     const message = "Hello, Backend!";
     ```

2. **Comentários**:
   - Comente apenas quando necessário, explicando o *porquê* do código, não o *como*:
     ```typescript
     // Gera o token JWT para autenticação
     const token = generateToken(userId);
     ```

3. **Formatadores de Código**:
   - Utilize ferramentas como [Prettier](https://prettier.io) e [ESLint](https://eslint.org) para garantir um código limpo e padronizado.

---

## Exemplos Práticos

### Configuração de um Serviço no Backend
```typescript
// src/services/user.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
```

### Configuração de Middleware para Autenticação
```typescript
// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
```

