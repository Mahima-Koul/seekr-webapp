import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Item from '../models/item.js'

export const addItem= async(req, res)=>{
    try {
        const { title, description, category, date, location, contactInfo}= JSON.parse(req.body.item)
        const imageFile= req.file

        //check if all fields are present
        if(!title || !description || !category|| !location|| !date){
            return res.json({success: false, message: "Missing required fields"})
        }

        const fileBuffer= fs.readFileSync(imageFile.path)

        //upload image to ImageKit
        const response= await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/items"
        })

        //optimize through imagekit URL transformation
        const optimisedImageUrl= imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},  //auto compression
                {format: 'webp'},   //convert to modern format
                {width: '1280'}     //width resized 
            ]
        })
        const image= optimisedImageUrl
        await Item.create({title, description, category, date, location, contactInfo, image, resolved: false })
        res.json({success: true, message: "Item added successfully"})

    } catch (error) {
       res.json({success: false, message: error.message})
 
    }
}

export const getAllItems= async(req, res)=>{
    try {
        const items= await Item.find({resolved: false})
        res.json({success: true, items})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getItemById= async(req,res)=>{
    try {
        const {itemId}=req.params
        const item= await Item.findById(itemId)
        if(!item){
            res.json({success: false, message: "Item not found"})
        }
        res.json({success: true, item})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteItemById= async(req,res)=>{
    try {
        const {id}=req.body
        await Item.findByIdAndDelete(id)
        res.json({success: true, message: "Item deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const toggleResolved = async(req, res)=>{
    try {
        const {id}= req.body
        const item= await Item.findById(id)
        item.resolved= !item.resolved
        await item.save()
        res.json({success: true, message: "Item status updated"}) 
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}