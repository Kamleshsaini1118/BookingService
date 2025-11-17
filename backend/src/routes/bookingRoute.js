import { Router } from "express";
import verifyJWT from "../middleware/bookingMiddleware.js";
import {
  createBooking,
  getMyBookings,
  deleteBooking
} from "../controllers/bookingController.js";

const router = Router();

// Create booking
router.route("/create").post(verifyJWT, createBooking);

// Get logged-in user's bookings
router.route("/me").get(verifyJWT, getMyBookings);

// Delete booking (only owner)
router.route("/:id").delete(verifyJWT, deleteBooking);

export default router;
