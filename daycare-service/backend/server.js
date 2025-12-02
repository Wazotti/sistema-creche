const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Em memória (temporário)
let nextTurmaId = 1;
let nextCriancaId = 1;
const turmas = [];
const criancas = [];

// --- ROTAS DE TURMAS ---
app.post('/api/turmas', (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ error: 'Nome da turma é obrigatório' });
  }
  const nova = { id: nextTurmaId++, nome };
  turmas.push(nova);
  return res.status(201).json(nova);
});

app.get('/api/turmas', (req, res) => {
  res.json(turmas);
});

// --- ROTAS DE CRIANÇAS ---
app.post('/api/criancas', (req, res) => {
  const { nome, turma, autorizados } = req.body;
  if (!nome || !turma) {
    return res.status(400).json({ error: 'Nome e turma são obrigatórios' });
  }

  const nova = {
    id: nextCriancaId++,
    nome,
    turma,
    autorizados: Array.isArray(autorizados) ? autorizados : []
  };
  criancas.push(nova);
  return res.status(201).json(nova);
});

app.get('/api/criancas', (req, res) => {
  res.json(criancas);
});

app.get('/api/criancas/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = criancas.find(c => c.id === id);
  if (!item) return res.status(404).json({ error: 'Criança não encontrada' });
  return res.json(item);
});

app.put('/api/criancas/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, turma, autorizados } = req.body;

  const index = criancas.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Criança não encontrada' });

  criancas[index] = {
    ...criancas[index],
    nome,
    turma,
    autorizados: Array.isArray(autorizados) ? autorizados : []
  };

  return res.json(criancas[index]);
});

app.delete('/api/criancas/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = criancas.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Criança não encontrada' });

  criancas.splice(index, 1);
  return res.json({ mensagem: 'Criança removida com sucesso' });
});

// --- ROTAS DE MENSAGENS ---
app.post('/api/mensagem/checkin', (req, res) => {
  res.json({ sucesso: true, tipo: 'checkin', dados: req.body });
});

app.post('/api/mensagem/checkout', (req, res) => {
  res.json({ sucesso: true, tipo: 'checkout', dados: req.body });
});

app.post('/api/mensagem/status', (req, res) => {
  res.json({ sucesso: true, tipo: 'status', dados: req.body });
});

app.post('/api/mensagem/alerta', (req, res) => {
  res.json({ sucesso: true, tipo: 'alerta', dados: req.body });
});

// --- ROTAS DE LOGIN ---
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    return res.json({ token: 'FAKE-TOKEN-admin', role: 'admin' });
  }
  return res.status(401).json({ error: 'Credenciais inválidas' });
});

// Porta
const PORT = 3334;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});