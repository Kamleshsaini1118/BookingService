import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const verifyAdmin = asyncHandler((req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  if (req.user.role !== "admin") {
    throw new ApiError(403, "Admin access only");
  }

  next();
});

export default verifyAdmin;