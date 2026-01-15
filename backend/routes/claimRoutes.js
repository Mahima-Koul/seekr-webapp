import express from "express";
import {
  createClaim,
  approveClaim,
  rejectClaim,
    getMyClaims, 
} from "../controllers/claimController.js";
import protect from "../middleware/auth.js";

const claimRouter = express.Router();


claimRouter.post("/create", protect, createClaim);
claimRouter.post("/approve", protect, approveClaim);
claimRouter.post("/reject", protect, rejectClaim);
claimRouter.get("/my-claims",protect,getMyClaims);

export default claimRouter;
