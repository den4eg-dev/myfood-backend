import Model from '../models/ingredients-model.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class IngredientsService {
  async create(body, file) {
    try {
      let { name, protein, fat, carbs, calories } = body;
      const { image } = file;
      const nameArr = image.name.split('.');
      const fileFormat = nameArr[nameArr.length - 1];

      let fileName = uuidv4() + `.${fileFormat}`;
      await image.mv(path.resolve(__dirname, '..', 'static/images', fileName));
      return await Model.create({
        name,
        protein,
        fat,
        carbs,
        calories,
        image: { path: `images/${fileName}`, original: image.name },
      });
    } catch (err) {
      console.log(err.message || err);
    }
  }
}

export default new IngredientsService();
