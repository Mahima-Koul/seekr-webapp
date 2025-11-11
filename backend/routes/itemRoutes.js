import express from 'express'
import { addItem, deleteItemById, getAllItems, getItemById, toggleResolved } from '../controllers/itemController.js'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'

const itemRouter= express.Router()

itemRouter.post("/add",upload.single('image'), addItem)
itemRouter.get("/all", getAllItems)
itemRouter.get("/:id", getItemById)
itemRouter.post("/delete", auth,deleteItemById)
itemRouter.post("/toggle-resolve", auth, toggleResolved)

export default itemRouter