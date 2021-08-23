import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const IngredientsSchema = new Schema(
  {
    name: { type: String, required: true },
    protein: { calories: Number, type: Number, required: true, default: 0 },
    fat: { calories: Number, type: Number, required: true, default: 0 },
    calories: { type: Number, required: true, default: 0 },
    carbs: { type: Number, required: true, default: 0 },
    image: { type: Object, path: String, original: String },
  },
  { timestamps: true }
);

export default model('ingredients', IngredientsSchema);
