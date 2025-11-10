import mongoose from "mongoose";
const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: ["Lost", "Found"], required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    contactInfo: { type: String, required: true },
    image: { type: String, default: "" },
    resolved: { type: Boolean, default: false }, // or user reference later
  },
  { timestamps: true }
);

const Item=mongoose.model('item', itemSchema)
export default Item