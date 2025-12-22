import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Item from '../models/Item.js'

//Controller to handle adding a new item
export const addItem= async(req, res)=>{
    try {
        const { title, description, category,type, date, location, contactInfo}= JSON.parse(req.body.item)
        const imageFile= req.file

        //check if all fields are present
        if(!title || !description || !category||!type||!location|| !date){
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

        //create new item in database
        await Item.create({title, description, category,type, date, location, contactInfo, image, resolved: false })
        res.json({success: true, message: "Item added successfully"})

    } catch (error) {
       res.json({success: false, message: error.message})
 
    }
}

// Controller to search for items by title or description
export const searchItems = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) {
      return res.status(400).json({ success: false, message: "Search query is missing" });
    }

    // Search by title or description (case-insensitive)
    const items = await Item.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    if (items.length === 0) {
      return res.json({ success: true, message: "No matching items found", items: [] });
    }

    res.json({ success: true, items });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Server error during search" });
  }
};


//Controller to get all unresolved items
export const getAllItems= async(req, res)=>{
    try {
        const items= await Item.find({resolved: false})
        res.json({success: true, items})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


//Controller to get item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.json({ success: false, message: "Item not found" }); // return stops execution
    }

    res.json({ success: true, item });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//Controller to delete item by ID
export const deleteItemById = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



//Controller to toggle resolved status of an item
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