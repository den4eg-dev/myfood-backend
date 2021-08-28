import Model from '../models/ingredients-model.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { unlinkSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class IngredientsService {
  async create(body, files) {
    // console.log(body, files);
    try {
      if (files !== null || body.image) {
        let { title, protein, fat, carbs, calories } = body;
        const { image } = files;
        const nameArr = image.name.split('.');
        const fileFormat = nameArr[nameArr.length - 1];

        let fileName = uuidv4() + `.${fileFormat}`;
        await image.mv(
          path.resolve(__dirname, '..', 'static/images', fileName)
        );
        return await Model.create({
          title,
          protein,
          fat,
          carbs,
          calories,
          image: {
            path: `images/${fileName}`,
            original: image.name,
            filename: `${fileName}`,
          },
        });
      } else {
        return await Model.create({ ...body });
      }
    } catch (err) {
      console.log(err.message || err);
    }
  }

  async update(params, body, files) {
    console.log('TEST', params, body, files);

    try {
      if (files) {
        const { image } = files;
        const { protein, fat, carbs, calories, title, filename = '' } = body;
        const nameArr = image.name.split('.');
        const fileFormat = nameArr[nameArr.length - 1];
        let fileName = uuidv4() + `.${fileFormat}`;
        await image.mv(
          path.resolve(__dirname, '..', 'static/images', fileName)
        );
        // remove old file======
        if (filename)
          unlinkSync(path.resolve(__dirname, '..', 'static/images', filename));
        return await Model.findByIdAndUpdate(
          { _id: params.id },
          {
            title,
            protein,
            fat,
            carbs,
            calories,
            image: {
              path: `images/${fileName}`,
              original: image.name,
              filename: `${fileName}`,
            },
          },
          { new: true }
        );
      } else
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

  async delete({ id }) {
    try {
      const item = await Model.findById(id);
      await Model.findByIdAndDelete(id);
      if (item.image.filename)
        unlinkSync(
          path.resolve(__dirname, '..', 'static/images', item.image.filename)
        );
      return { message: `Ingredient with ${id} deleted` };
    } catch (err) {
      console.log(err.message || err);
    }
  }
}

export default new IngredientsService();

// name,
//     protein,
//     fat,
//     carbs,
//     calories,
//     image: { path: `images/${fileName}`, original: file.image.name },
