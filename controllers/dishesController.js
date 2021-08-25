import Model from '../models/dishes-model.js';
import DishesService from '../services/dishesService.js';

class DishesController {
  async get(req, res, next) {
    try {
      const sort = {};
      // const page = parseInt(req.query.page) || 1;
      // const limit = parseInt(req.query.limit) || 10;
      // const step = (page - 1) * limit;
      // const total = await Model.countDocuments();
      if (req.query.sortBy) {
        const str = req.query.sortBy.split(':');
        sort[str[0]] = str[1] === 'desc' ? -1 : 1;
      }
      const data = await Model.find({}).sort(sort);
      return res.json(data);
    } catch (err) {
      console.log(err.message || err);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const ingredient = await Model.findById(id);
      return res.json(ingredient);
    } catch (err) {
      console.log(err.message || err);
    }
  }

  async create(req, res, next) {
    try {
      const dishes = await DishesService.create(req.body, req.params);
      return res.json(dishes);
    } catch (err) {
      console.log(err.message || err);
    }
  }

  async update(req, res, next) {
    try {
      // console.log('im in controller req.files  ', req.files);
      const updatedIngredient = await DishesService.update(
        req.params,
        req.body,
        req.files
      );
      return res.json(updatedIngredient);
    } catch (err) {
      console.log(err.message || err);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      await Model.findByIdAndDelete(id);
      return res.json({ message: `Dish with ${id} deleted` });
    } catch (err) {
      console.log(err.message || err);
    }
  }
}

export default new DishesController();
