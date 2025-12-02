exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  if (username === 'admin' && password === '1234') {
    return res.json({ token: 'FAKE-TOKEN-admin', role: 'admin' });
  }

  if (username === 'responsavel' && password === 'abcd') {
    return res.json({ token: 'FAKE-TOKEN-responsavel', role: 'responsavel' });
  }

  return res.status(401).json({ error: 'Credenciais inválidas' });
};