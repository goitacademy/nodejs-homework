const { UsersRepository } = require('../repository');

class UsersService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }
  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }
  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }
  async create(body) {
    console.log(body);
    const data = await this.repositories.users.create(body);
    console.log(data);
    return data;
  }
  async updateSubscription(id, subscription) {
    const data = await this.repositories.users.updateSubscription(id, subscription);
    return data;
  }
}

module.exports = UsersService;
