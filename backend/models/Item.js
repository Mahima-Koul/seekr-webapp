import mongoose from "mongoose";


//Item Schema defines the structure of lost and found items in the database
const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: ["Lost", "Found"], required: true },
    type: { type: String, enum: ["Electronics", "ID & Cards", "Books & Stationery", "Other"], required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    contactInfo: { type: String, required: true },
    image: { type: String, default: "" },
    resolved: { type: Boolean, default: false }, // or user reference later
  },
  { timestamps: true }
);


//Create and export the Item model based on the itemSchema
const Item=mongoose.model('item', itemSchema)
export default Item