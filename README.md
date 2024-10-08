# Task Manager App

## Descrição
Aplicação web de gerenciamento de tarefas com autenticação de usuários usando JWT. Os usuários podem criar, editar e excluir tarefas pessoais.

## Tecnologias
- **Backend**: Node.js, Express, JWT, MongoDB
- **Frontend**: HTML, CSS, JavaScript

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/task-manager-app.git
2.Instale as dependências:
   npm install
3.Configure o arquivo .env:
   MONGO_URI=<sua_url_mongodb>
JWT_SECRET=<sua_chave_secreta>
4.Inicie o servidor:
  node server.js
  
Rotas da API

Autenticação
POST /api/auth/register: Registro de usuário.
POST /api/auth/login: Login e obtenção de token JWT.

Tarefas (Protegido por JWT)
GET /api/tasks: Retorna tarefas do usuário autenticado.
POST /api/tasks: Cria nova tarefa.
PUT /api/tasks/:id: Atualiza tarefa.
DELETE /api/tasks/:id: Exclui tarefa.
Testes com Insomnia
Adicione o token JWT no cabeçalho:

Key: Authorization
Value: Bearer <seu_token_aqui>
