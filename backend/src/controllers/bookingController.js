import Service from "../models/serviceModel.js";
import {Booking} from "../models/bookingModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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


const getMyBookings = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  
  const bookings = await Booking.find({ user: userId })
    .populate('service', 'name price')
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, bookings, "Bookings retrieved successfully")
  );
});


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