const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtém o token do cabeçalho Authorization
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  
  // Verifica se o token está presente
  if (!token) return res.status(401).json({ msg: 'Sem token, autorização negada' });

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Salva o usuário decodificado na requisição
    next(); // Chama o próximo middleware
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};
