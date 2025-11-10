import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Item from '../models/Item.js'

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
            fileName: imageFile.originalName,
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
        await Item.create({title, description, category, date, location, contactInfo, image })
        res.json({success: true, message: "Item added successfully"})

    } catch (error) {
       res.json({success: false, message: error.message})
 
    }
}