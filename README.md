# 🧒 Sistema de Creche

## 👥 Integrantes do Grupo
- Maria Clara Mazotti  
- Sabrina de Andrade

---

## 📖 Descrição do Sistema
O **Sistema de Creche** é uma aplicação para gestão de creches, permitindo o controle de crianças, responsáveis e eventos do dia a dia (check-in, check-out, atualização de status e alertas de retirada não autorizada).  

### 🎯 Público-alvo
- Creches e escolas infantis  
- Instituições que precisam controlar entrada e saída de crianças  
- Equipes administrativas que desejam automatizar notificações e relatórios  

---

## 🛠 Tecnologias Utilizadas
- Node.js + Express  
- Spring Boot  
- RabbitMQ  
- Docker & Docker Compose  
- Lombok  
- Maven  

---

## 🚀 Funcionalidades
- Cadastro de crianças e responsáveis  
- Check-in e check-out de crianças  
- Atualização de status  
- Alerta de retirada não autorizada  
- Envio de eventos para filas do RabbitMQ  
- Serviço de e-mail que consome eventos e simula envio de notificações  

---

## 🧱 Arquitetura
- **Backend (Node.js + Express):** expõe APIs REST e publica eventos no RabbitMQ  
- **Mensageria (RabbitMQ):** gerencia filas de eventos  
- **Email Service (Spring Boot):** consome mensagens das filas e simula envio de e-mails  
- **Frontend:** painel administrativo simples para interação  
- **Docker Compose:** orquestração dos serviços  

---

## ▶️ Como rodar o sistema (Backend + Frontend)

1. **Entre na pasta** `darcare-service`

2. **Instale as dependências:**
   ```bash
   npm install

3. **Inicie o Sistema:**
   ```bash
   npm start

4. **O painel estará disponível em:** http://localhost:3004

## 🐳 Como rodar com Docker

1. Clone o repositório:
   ```bash
   git clone https://github.com/Wazotti/sistema-creche.git
   cd sistema-creche

3. Suba os serviços:
   ```bash
   docker-compose up

3. Acesse:
   
- **Painel Admin:** http://localhost:3004
- **RabbitMQ:** http://localhost:15672 (login: guest / guest)
- **Email Service:** porta configurada no `docker-compose.ym`

---

## 📬 Mensageria

O sistema utiliza **RabbitMQ** para comunicação entre serviços.

- **Quem produz:** o backend (Node.js) publica eventos nas filas quando ocorre check-in, check-out ou retirada não autorizada.
- **Quem consome:** o serviço de e-mail (Spring Boot) escuta essas filas e simula o envio de notificações.

Exemplos de filas:

- `child.checkedin`
- `child.checkedout`
- `status.updated`
- `unauthorized.pickup`

---

## 📬 Simulação de E-mail

O serviço de e-mail (EmailEventListener) consome eventos das filas:- child.checkedin
- `child.checkedout`
- `status.updated`
- `unauthorized.pickup`

---

## 🛠 Tecnologias Utilizadas- Node.js + Express

- Spring Boot
- RabbitMQ
- Docker & Docker Compose
- Lombok
- Maven

---
