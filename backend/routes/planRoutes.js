import express from "express";
import {
  createPlan,
  deletePlan,
  getPlan,
  listPlans,
  updatePlan,
} from "../controllers/planController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create",isAuthenticated, createPlan);
router.get("/list", listPlans);
router.get("/:id", getPlan);
router.delete("/:id",isAuthenticated, deletePlan);
router.put("/:id",isAuthenticated, updatePlan);

export default router;
