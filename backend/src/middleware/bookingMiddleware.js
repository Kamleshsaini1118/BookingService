import { User } from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.auth?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

    console.log("ACCESS TOKEN FROM COOKIE:", req.cookies?.accessToken);
    console.log("AUTH HEADER:", req.header("Authorization"));

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token -user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token --token");
  }
});


export default verifyJWT;