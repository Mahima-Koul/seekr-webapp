import Claim from "../models/Claim.js";
import Item from "../models/Item.js";
import Notification from "../models/Notification.js";

/**
 * CREATE CLAIM / FOUND REQUEST
 * type = "CLAIM" or "FOUND"
 */
export const createClaim = async (req, res) => {
  try {
    const { itemId, type } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    // ❌ can't claim your own item
    if (item.createdBy.toString() === req.user._id.toString()) {
      return res.json({ success: false, message: "You own this item" });
    }

    // ❌ prevent duplicate pending claims
    const existingClaim = await Claim.findOne({
      item: itemId,
      requester: req.user._id,
      status: "PENDING",
    });

    if (existingClaim) {
      return res.json({ success: false, message: "Claim already sent" });
    }

    const claim = await Claim.create({
      item: itemId,
      requester: req.user._id,
      owner: item.createdBy,
      type,
    });

    // 🔔 notify owner
    await Notification.create({
      user: item.createdBy,
      message:
        type === "CLAIM"
          ? "Someone requested to claim your item"
          : "Someone said they found your item",
      link: "/dashboard",
    });

    res.json({ success: true, message: "Request sent successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const approveClaim = async (req, res) => {
  try {
    const { claimId } = req.body;

    const claim = await Claim.findById(claimId).populate("item requester");
    if (!claim) {
      return res.json({ success: false, message: "Claim not found" });
    }

    // ❌ only item owner can approve
    if (claim.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    claim.status = "APPROVED";
    await claim.save();

    // 🔔 notify requester
    await Notification.create({
      user: claim.requester._id,
      message: "Your request was approved. Contact info unlocked.",
      link: `/item/${claim.item._id}`,
    });

    res.json({ success: true, message: "Claim approved" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

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

