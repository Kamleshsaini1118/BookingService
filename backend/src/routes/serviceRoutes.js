import { Router } from "express";
import { getAllServices } from "../controllers/serviceController.js";
const router = Router();

router.route("/").get(getAllServices);

export default router;