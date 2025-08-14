# 📋 Task Manager

Aplicação web para gerenciar tarefas do dia a dia, permitindo criar, editar, marcar como concluídas e excluir tarefas.  
Desenvolvido em **Angular** com simulação de backend via **JSON Server**.

---

## 📦 Tecnologias Utilizadas

- **Angular 20**
- **TypeScript**
- **SCSS**
- **JSON Server** (mock de API)
- **Angular Material**
- **Tailwind**

---

## 📋 Funcionalidades

- [x] Criar tarefa  
- [x] Editar tarefa  
- [x] Marcar tarefa como concluída  
- [x] Excluir tarefa   

---

## ⚙️ Pré-requisitos

- **Node.js** >= 18  
- **npm** >= 9  
- **Angular CLI** >= 20  

---

## 🛠️ Instalação e Uso

```bash
# Clonar repositório
git clone https://github.com/gustavoppo/task-manager.git

# Entrar na pasta
cd task-manager

# Instalar dependências
npm install

# Rodar a aplicação
ng serve

# Rodar mock json-server
json-server --watch db.json --port 3000

# Acessar no navegador
http://localhost:4200
