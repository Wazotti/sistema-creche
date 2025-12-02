# 🧒 Sistema de Creche

Este projeto é uma aplicação para gestão de creches, permitindo o controle de crianças, responsáveis e eventos do dia a dia (check-in, check-out, status e alertas).  
A arquitetura é baseada em **microserviços**, com **RabbitMQ** para mensageria e um serviço de e-mail em **Spring Boot** para simulação de notificações.

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

## 🐳 Como rodar com Docker

1. Clone o repositório:
   ```bash
   git clone https://github.com/Wazotti/sistema-creche.git
   cd sistema-creche

3. Suba os serviços:
   ```bash
   docker-compose up

3. Acesse:
   
- **Painel Admin:** http://localhost:3000
- **RabbitMQ:** http://localhost:15672 (login: guest / guest)
- **Email Service:** porta configurada no `docker-compose.ym`

---

## 📬 Simulação de E-mail

O serviço de e-mail (EmailEventListener) consome eventos das filas:- child.checkedin
- `child.checkedout`
- `status.updated`
- `unauthorized.pickup`

## 🛠 Tecnologias Utilizadas- Node.js + Express

- Spring Boot
- RabbitMQ
- Docker & Docker Compose
- Lombok
- Maven

---
