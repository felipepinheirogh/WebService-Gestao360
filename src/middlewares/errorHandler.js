function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Erro interno',
  });
}

module.exports = errorHandler;
