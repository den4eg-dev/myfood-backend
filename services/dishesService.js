import Model from '../models/dishes-model.js';
// import { v4 as uuidv4 } from 'uuid';
// import path from 'path';
// import { fileURLToPath } from 'url';
// // import { unlinkSync } from 'fs';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

class DishesService {
  async create(body, params) {
    // console.log(body, params);
    try {
      return await Model.create({ ...body });
    } catch (err) {
      console.log(err.message || err);
    }
  }

  async update(params, body, files) {
    // console.log('TEST', params, body, files);
    try {
      return await Model.findByIdAndUpdate(
        { _id: params.id },
        {
          ...body,
        },
        { new: true }
      );
    } catch (err) {
      console.log(err.message || err);
    }
  }
}

export default new DishesService();

// name,
//     protein,
//     fat,
//     carbs,
//     calories,
//     image: { path: `images/${fileName}`, original: file.image.name },
