import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const DishesSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: Object, default: {} },
    meals: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default model('dishes', DishesSchema);
