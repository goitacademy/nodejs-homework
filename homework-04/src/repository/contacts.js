const Contact = require('../shemas/contacts');
class ContactsRepository {
  constructor() {
    this.model = Contact;
  }
  async listContacts(userId, { limit = 5, offset = 0, sortBy, SortByDesc, filter }) {
    // const sort = null;
    // if (sortBy) {
    //   sort = {
    //     [`${sortBy}`]: 1,
    //   };
    // }
    // if (SortByDesc) {
    //   sort = {
    //     [`${SortByDesc}`]: -1,
    //   };
    // }

    const result = await this.model.paginate(
      { owner: userId },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(SortByDesc ? { [`${SortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {
          path: 'owner',
          select: 'email -_id',
        },
      },
    );
    return result;
  }
  async getById(userId, id) {
    try {
      const result = await this.model.findOne({ _id: id, owner: userId }).populate({
        path: 'owner',
        select: 'email -_id',
      });
      return result;
    } catch (e) {
      e.status = 400;
      e.data = 'bad request';
      throw e;
    }
  }

  async create(userId, body) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async update(userId, id, body) {
    const result = await this.model.findByIdAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true }).populate({
      path: 'owner',
      select: 'email -_id',
    });
    return result;
  }

  async remove(userId, id) {
    const result = await this.model.findByIdAndDelete({ _id: id, owner: userId }).populate({
      path: 'owner',
      select: 'email -_id',
    });
    return result;
  }
}

module.exports = ContactsRepository;
