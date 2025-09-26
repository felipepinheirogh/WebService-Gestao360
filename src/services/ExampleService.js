class ExampleService {
  constructor(repository) {
    this.repository = repository;
  }

  async listItems(query) {
    return this.repository.list(query);
  }

  async createItem(payload) {
    // regras de negócio antes de inserir
    return this.repository.create(payload);
  }
}

module.exports = ExampleService;
