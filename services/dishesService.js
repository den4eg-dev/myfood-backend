import Model from '../models/dishes-model.js';

const calcNutrients = (array, nutrient) => {
  switch (nutrient) {
    case 'protein':
      return array.reduce((sum, item) => {
        return sum + Number(item.protein);
      }, 0);
    case 'fat':
      return array.reduce((sum, item) => {
        return sum + Number(item.fat);
      }, 0);
    case 'calories':
      return array.reduce((sum, item) => {
        return sum + Number(item.calories);
      }, 0);
    case 'carbs':
      return array.reduce((sum, item) => {
        return sum + Number(item.carbs);
      }, 0);
    default:
      return null;
  }
};

class DishesService {
  async create(body) {
    try {
      return await Model.create(body);
    } catch (err) {
      console.log(err.message || err);
    }
  }

  async update(params, body) {
    try {
      const summary = {
        protein: calcNutrients(body, 'protein'),
        fat: calcNutrients(body, 'fat'),
        calories: calcNutrients(body, 'calories'),
        carbs: calcNutrients(body, 'carbs'),
      };

      return await Model.findByIdAndUpdate(
        { _id: params.id },

        {
          summary,
          meals: body,
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
