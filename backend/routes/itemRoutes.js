import express from 'express'
import upload from '../middleware/multer.js'
import protect from '../middleware/auth.js'
import {
  addItem,
  searchItems,
  deleteItemById,
  getAllItems,
  getItemById,
  toggleResolved,
  getMyItems,
  updateItemById
} from "../controllers/itemController.js";


const itemRouter= express.Router()
itemRouter.put("/update/:id", protect, updateItemById);

itemRouter.post("/add",protect, upload.single('image'), addItem)  //adding an item
itemRouter.get('/search', searchItems);  //searching an item
itemRouter.get("/myitems", protect, getMyItems)  
itemRouter.get("/all", getAllItems)  //getting all global items
itemRouter.get("/:id", getItemById)   //getting an item by id
itemRouter.post("/delete/:id",deleteItemById)
itemRouter.post("/toggle-resolve", protect, toggleResolved)


export default itemRouter
