const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const Response = require('../utils/Response');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.error(res, 'Token não fornecido', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return Response.error(res, 'Token inválido ou expirado', 401);
  }
}

module.exports = authMiddleware;