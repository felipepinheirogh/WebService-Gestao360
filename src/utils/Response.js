class Response {
  static success(res, data, message = 'OK') {
    return res.json({ success: true, message, data });
  }

  static error(res, message = 'Erro', status = 400) {
    return res.status(status).json({ success: false, message });
  }
}

module.exports = Response;
