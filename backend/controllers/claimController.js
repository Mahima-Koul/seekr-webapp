import Claim from "../models/Claim.js";
import Item from "../models/Item.js";
import Notification from "../models/Notification.js";

/**
 * CREATE CLAIM / FOUND REQUEST
 */

export const createClaim = async (req, res) => {
  try {
     if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login to claim this item",
      });
    }
    const { itemId, type } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    // ❌ cannot claim your own item
    if (item.createdBy.toString() === req.user._id.toString()) {
      return res.json({ success: false, message: "You cannot claim your own item" });
    }

    // ❌ prevent duplicate pending claims
    const alreadyRequested = await Claim.findOne({
      item: itemId,
      requester: req.user._id,
      status: "PENDING",
    });

    if (alreadyRequested) {
      return res.json({ success: false, message: "Request already sent" });
    }

    const claim = await Claim.create({
      item: itemId,
      requester: req.user._id,
      owner: item.createdBy,
      type,
    });
    const claimantName = req.user.name;
const claimantEmail = req.user.email;

let notificationMessage = "";

if (item.category === "Lost") {
  // someone claims a LOST item → they “found it”
  notificationMessage = `${claimantName} (${claimantEmail}) says they found your lost item: "${item.title}"`;
} else if (item.category === "Found") {
  // someone claims a FOUND item → just claim
  notificationMessage = `${claimantName} (${claimantEmail}) claimed your found item: "${item.title}"`;
}
if (!notificationMessage) {
  return res.status(400).json({ success: false, message: "Notification message cannot be empty" });
}
    await Notification.create({
      user: item.createdBy,
      message:notificationMessage,
      //   type === "CLAIM"
      //     ? `${req.user.name} (${req.user.email}) claimed the item you found` 
      //     :  `${req.user.name} (${req.user.email}) says they found your lost item`,
      // link: "/dashboard",
 link: "/dashboard" ,
  type: "CLAIM"
    });

    res.json({ success: true, message: "Request sent successfully", claim });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/**
 * APPROVE CLAIM
 */
export const approveClaim = async (req, res) => {
  try {
    const { claimId } = req.body;

    const claim = await Claim.findById(claimId).populate("item requester");
    if (!claim) {
      return res.json({ success: false, message: "Claim not found" });
    }

    if (claim.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    claim.status = "APPROVED";
    await claim.save();

    // ✅ mark item resolved
    await Item.findByIdAndUpdate(claim.item._id, { resolved: true });

    await Notification.create({
      user: claim.requester._id,
      message: "Your request was approved! Contact the owner.",
      link: `/item/${claim.item._id}`,
    });

    res.json({ success: true, message: "Claim approved" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/**
 * REJECT CLAIM
 */
export const rejectClaim = async (req, res) => {
  try {
    const { claimId } = req.body;

    const claim = await Claim.findById(claimId);
    if (!claim) {
      return res.json({ success: false, message: "Claim not found" });
    }

    if (claim.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    claim.status = "REJECTED";
    await claim.save();

    res.json({ success: true, message: "Claim rejected" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getMyClaims=async(req,res)=>{
  try{
     console.log("REQ USER:", req.user);
        if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const claims=await Claim.find({requester:req.user._id}).populate("item")  .populate("requester", "name email").sort({createdAt:-1});

    res.json({success:true,claims,});
     console.log("CLAIMS FETCHED:", claims); // 🔹 Check what is returned
   
  }
  catch(error){
     console.error("Error fetching claims:", error); 
    res.status(500).json({
      success:false,message:"Failed to fetch claims ",
       error: error.message
    });
  }
};
