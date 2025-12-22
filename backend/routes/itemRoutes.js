import express from 'express'
//here I imported searchItems
import { addItem,searchItems, deleteItemById, getAllItems, getItemById, toggleResolved } from '../controllers/itemController.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'

const itemRouter= express.Router()

itemRouter.post("/add",upload.single('image'), addItem)
//updated and added search  
itemRouter.get('/search', searchItems);

itemRouter.get("/all", getAllItems)
itemRouter.get("/:id", getItemById)
itemRouter.post("/delete/:id",deleteItemById)
itemRouter.post("/toggle-resolve", auth, toggleResolved)

export default itemRouter
