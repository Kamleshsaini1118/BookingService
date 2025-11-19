import { Router } from "express";
import verifyJWT from "../middleware/bookingMiddleware.js";
import verifyAdmin from "../middleware/isAdmin.js";
import {
  getAdminStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
  blockUser,
  unblockUser
} from "../controllers/adminController.js";

const router = Router();

// all /admin routes require auth + admin
router.use(verifyJWT, verifyAdmin);

router.get("/stats", getAdminStats);
router.get("/bookings", getAllBookings);
router.patch("/bookings/:id/status", updateBookingStatus);

router.get("/users", getAllUsers);
router.patch("/users/:id/block", blockUser);
router.patch("/users/:id/unblock", unblockUser);

export default router;