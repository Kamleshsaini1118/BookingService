import { User } from "../models/userModel.js";
import { Booking } from "../models/bookingModel.js";
import Service from "../models/serviceModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const getAdminStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalBookings, totalServices] = await Promise.all([
    User.countDocuments(),
    Booking.countDocuments(),
    Service.countDocuments()
  ]);

  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "username email")
    .populate("service", "name");

  return res
    .status(200)
    .json(new ApiResponse(200, {
      totalUsers,
      totalBookings,
      totalServices,
      recentBookings
    }, "Admin stats fetched successfully"));
});

const getAllBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};

  if (status) {
    filter.status = status;
  }

  const bookings = await Booking.find(filter)
    .sort({ createdAt: -1 })
    .populate("user", "username email")
    .populate("service", "name");

  return res
    .status(200)
    .json(new ApiResponse(200, { bookings }, "Bookings fetched successfully"));
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    throw new ApiError(400, "Invalid booking status");
  }

  const booking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate("user", "username email")
    .populate("service", "name");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { booking }, "Booking status updated"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, { users }, "Users fetched successfully"));
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User blocked successfully"));
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User unblocked successfully"));
});

export {
  getAdminStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
  blockUser,
  unblockUser
};