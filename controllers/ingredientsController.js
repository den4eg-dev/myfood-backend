import Model from '../models/ingredients-model.js';
import IngredientsService from '../services/ingredientsService.js';

class IngredientsController {
  async get(req, res, next) {
    try {
      let options = {};
      let sort = {};
      let match = {};
      let search = {};

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const step = (page - 1) * limit;
      const total = await Model.countDocuments();

      if (req.query.sortBy) {
        const str = req.query.sortBy.split(':');
        sort[str[0]] = str[1] === 'desc' ? -1 : 1;
      }

      if (req.query.searchByName) {
        // TODO need to make more flexible!!!
        // const str = Object.keys(req.query);
        // console.log(str);

        options = {
          ...options,
          search: {
            title: { $regex: req.query.searchByName, $options: 'i' },
          },
        };
      }
      if (req.query.protein) {
        match.protein = { $gt: 70 };
      }

      const data = await Model.find({ ...options.search })
        .sort(sort)
        .limit(limit)
        .skip(step);

      return res.json({
        data,
        page,
        prevPage: page - 1,
        currentPage: page,
        nextPage: page + 1,
        lastPage: Math.ceil(total / limit),
        total,
      });
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
      const ingredients = await IngredientsService.create(req.body, req.files);
      console.log('ING', ingredients);
      return res.json(ingredients);
    } catch (err) {
      console.log(err.message || err);
    }
  }

  async update(req, res, next) {
    try {
      const updatedIngredient = await IngredientsService.update(
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
      const deletedItem = await IngredientsService.delete(req.params);
      console.log(deletedItem);
      return res.json(deletedItem);
    } catch (err) {
      console.log(err.message || err);
    }
  }
}

export default new IngredientsController();
