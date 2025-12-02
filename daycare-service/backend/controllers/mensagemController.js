const rabbitService = require('../services/rabbitService');

exports.checkin = async (req, res) => {
  const { nomeCrianca, hora } = req.body;
  await rabbitService.publish('child.checkedin', { nomeCrianca, hora });
  res.json({ status: 'Check-in enviado', data: { nomeCrianca, hora } });
};

exports.checkout = async (req, res) => {
  const { nomeCrianca, hora } = req.body;
  const retiradoPor = 'Maria'; // ajuste conforme necessário ou receba do front-end
  await rabbitService.publish('child.checkedout', { nomeCrianca, retiradoPor, hora });
  res.json({ status: 'Check-out enviado', data: { nomeCrianca, retiradoPor, hora } });
};

exports.status = async (req, res) => {
  const { nomeCrianca, descricao } = req.body;
  await rabbitService.publish('status.updated', { nomeCrianca, descricao });
  res.json({ status: 'Status enviado', data: { nomeCrianca, descricao } });
};

exports.alerta = async (req, res) => {
  const { nomeCrianca } = req.body;
  await rabbitService.publish('unauthorized.pickup', { nomeCrianca });
  res.json({ status: 'Alerta enviado', data: { nomeCrianca } });
};