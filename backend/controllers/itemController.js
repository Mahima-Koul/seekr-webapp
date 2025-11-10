

export const addItem= async(req, res)=>{
    try {
        const { title, description, category, date, location, contactInfo}= JSON.parse(req.body.item)
        const imageFile= req.file

        //check if all fields are present
        if(!title || !description || !category|| !location|| !date){
            return res.json({success: false, message: "Missing required fields"})
        }
    } catch (error) {
        
    }
}