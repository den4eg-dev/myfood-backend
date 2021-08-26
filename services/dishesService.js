import Model from '../models/dishes-model.js';

class DishesService {
  async create(body) {
    try {
      return await Model.create({ ...body });
    } catch (err) {
      console.log(err.message || err);
    }
  }

  async update(params, body) {
    try {
      const tmp = [...body];
      return await Model.findByIdAndUpdate(
        { _id: params.id },

        {
          summary: [...tmp][0],
          meals: [...tmp][1],
        },
        {
          new: true,
        }
      );
    } catch (err) {
      console.log(err.message || err);
    }
  }
}

export default new DishesService();
