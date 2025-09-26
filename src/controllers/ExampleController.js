const ExampleService = require('../services/ExampleService');
const SupabaseRepository = require('../repositories/SupabaseRepository');

const repo = new SupabaseRepository('example_table');
const service = new ExampleService(repo);

class ExampleController {
  static async list(req, res, next) {
    try {
      const result = await service.listItems(req.query);
      res.json({ success: true, ...result });
    } catch (err) { next(err); }
  }

  static async create(req, res, next) {
    try {
      const result = await service.createItem(req.body);
      res.status(201).json({ success: true, item: result });
    } catch (err) { next(err); }
  }
}

module.exports = ExampleController;
