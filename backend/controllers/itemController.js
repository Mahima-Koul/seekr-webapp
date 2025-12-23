import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Item from "../models/Item.js";

/* =========================
   ADD ITEM
   ========================= */
export const addItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      date,
      location,
      contactInfo
    } = JSON.parse(req.body.item);

    const imageFile = req.file;

    if (!title || !description || !category || !type || !location || !date) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const itemDate = new Date(date);
    if (isNaN(itemDate.getTime())) {
      return res.json({ success: false, message: "Invalid date" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/items"
    });

    const image = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" }
      ]
    });

    await Item.create({
      title,
      description,
      category,
      type,
      date: itemDate,
      location,
      contactInfo,
      image,
      resolved: false,
      createdBy: req.user._id   // ⭐ MULTI USER LINK
    });

    res.json({ success: true, message: "Item added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   SEARCH ITEMS (PUBLIC)
   ========================= */
export const searchItems = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) {
      return res.json({ success: false, message: "Search query missing" });
    }

    const items = await Item.find({
      resolved: false,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    }).sort({ date: -1 });

    res.json({ success: true, items });
  } catch (error) {
    res.json({ success: false, message: "Search failed" });
  }
};

/* =========================
   GET ALL UNRESOLVED ITEMS (PUBLIC FEED)
   ========================= */
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ resolved: false })
      .sort({ date: -1 });

    res.json({ success: true, items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   GET LOGGED-IN USER ITEMS
   ========================= */
export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ createdBy: req.user._id })
      .sort({ date: -1 });

    res.json({ success: true, items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   GET ITEM BY ID
   ========================= */
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("createdBy", "name phone");;

    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, item });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   DELETE ITEM (OWNER ONLY)
   ========================= */
export const deleteItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    await item.deleteOne();
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   TOGGLE RESOLVED (OWNER ONLY)
   ========================= */
export const toggleResolved = async (req, res) => {
  try {
    const { id } = req.body;
    const item = await Item.findById(id);
    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    if (item.createdBy.toString() !== req.user._id.toString()) {

      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    if (item.resolved) {
      return res.json({ success: false, message: "Item is already resolved" });
    }

    item.resolved = true;
    await item.save();

    res.json({ success: true, message: "Item marked as resolved!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

