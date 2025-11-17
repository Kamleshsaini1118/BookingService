import Service from "../models/serviceModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await Service.find();
    
    if (!services || services.length === 0) {
      // If no services found, return empty array instead of error
      return res.status(200).json(
        new ApiResponse(200, [], "No services found")
      );
    }

    return res.status(200).json(
      new ApiResponse(200, services, "Services retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error fetching services: " + error.message);
  }
});

export { getAllServices };
