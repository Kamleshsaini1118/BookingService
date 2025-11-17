// import mongoose from "mongoose";
// import { Booking } from "../models/bookingModel.js";
// import Service from "../models/serviceModel.js";
// import { ApiError } from "../utils/apiError.js";
// import { ApiResponse } from "../utils/apiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { getAllServices } from "./serviceController.js";


// // CREATE BOOKING
// const createBooking = asyncHandler(async (req, res) => {
//   const { serviceId, date } = req.body;
//   const userId = req.user._id;
//   // console.log({ serviceId, date, ...req.user });

//   if (!serviceId || !date) {
//     throw new ApiError(400, "serviceId and date are required");
//   }

//   if (!mongoose.Types.ObjectId.isValid(serviceId)) {
//     throw new ApiError(400, "Invalid serviceId");
//   }

//   //const service = await Service.findById(serviceId);
//   const { data } = getAllServices(); // no await
//   const service = data.find((s) => s.id === serviceId);
//   if (!service) {
//     throw new ApiError(404, "Service not found");
//   }

//   const bookingDate = new Date(date);
//   if (isNaN(bookingDate.getTime())) {
//     throw new ApiError(400, "Invalid date format");
//   }

//   const now = new Date();
//   if (bookingDate < now) {
//     throw new ApiError(400, "Booking date cannot be in the past");
//   }

//   // Check existing booking for the same day
//   const startOfDay = new Date(bookingDate);
//   startOfDay.setHours(0, 0, 0, 0);

//   const endOfDay = new Date(bookingDate);
//   endOfDay.setHours(23, 59, 59, 999);

//   const existingBooking = await Booking.findOne({
//     user: userId,
//     service: serviceId,
//     date: { $gte: startOfDay, $lte: endOfDay },
//   });

//   if (existingBooking) {
//     throw new ApiError(
//       409,
//       "You already have a booking for this service on selected date"
//     );
//   }

//   const booking = await Booking.create({
//     user: userId,
//     service: serviceId,
//     date: bookingDate,
//   });

//   const populatedBooking = await Booking.findById(booking._id).populate(
//     "service",
//     "name price description"
//   );

//   return res
//     .status(201)
//     .json(
//       new ApiResponse(201, populatedBooking, "Booking created successfully")
//     );
// });

// // GET MY BOOKINGS
// const getMyBookings = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   const bookings = await Booking.find({ user: userId })
//     .populate("service", "name price description")
//     .sort({ date: -1 });

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         { count: bookings.length, bookings },
//         "Bookings fetched successfully"
//       )
//     );
// });

// // DELETE BOOKING
// const deleteBooking = asyncHandler(async (req, res) => {
//   const bookingId = req.params.id;
//   const userId = req.user._id;

//   if (!mongoose.Types.ObjectId.isValid(bookingId)) {
//     throw new ApiError(400, "Invalid booking id");
//   }

//   const booking = await Booking.findById(bookingId);
//   if (!booking) {
//     throw new ApiError(404, "Booking not found");
//   }

//   if (booking.user.toString() !== userId.toString()) {
//     throw new ApiError(403, "You are not allowed to delete this booking");
//   }

//   await booking.deleteOne();

//   return res
//     .status(200)
//     .json(new ApiResponse(200, null, "Booking deleted successfully"));
// });

// export { createBooking, getMyBookings, deleteBooking };


import Service from "../models/serviceModel.js";
import {Booking} from "../models/bookingModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { serviceId } = req.body;
  const userId = req.user?._id;

  if (!serviceId) {
    throw new ApiError(400, "Service ID is required");
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  const booking = await Booking.create({
    service: serviceId,
    user: userId,
    price: service.price,
    status: "pending"
  });

  return res.status(201).json(
    new ApiResponse(201, booking, "Booking created successfully")
  );
});

// @desc    Get user's bookings
// @route   GET /api/bookings/me
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  
  const bookings = await Booking.find({ user: userId })
    .populate('service', 'name price')
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, bookings, "Bookings retrieved successfully")
  );
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Not authorized to delete this booking");
  }

  await booking.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, null, "Booking deleted successfully")
  );
});

export { createBooking, getMyBookings, deleteBooking };