import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const IngredientsSchema = new Schema(
  {
    title: { type: String, required: true },
    protein: { calories: Number, type: Number, required: false, default: 0 },
    fat: { calories: Number, type: Number, required: false, default: 0 },
    calories: { type: Number, required: false, default: 0 },
    carbs: { type: Number, required: false, default: 0 },
    image: { type: Object, required: false, path: String, original: String },
  },
  { timestamps: true }
);

export default model('ingredients', IngredientsSchema);
