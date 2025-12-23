import express from "express";
import {
  createClaim,
  approveClaim,
  rejectClaim,
} from "../controllers/claimController.js";
import protect from "../middleware/auth.js";

const claimRouter = express.Router();


claimRouter.post("/create", protect, createClaim);
claimRouter.post("/approve", protect, approveClaim);
claimRouter.post("/reject", protect, rejectClaim);

export default claimRouter;
