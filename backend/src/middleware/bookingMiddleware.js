// import jwt from "jsonwebtoken";
// import { User } from "../models/userModel.js";

// const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || "";
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : null;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized, token missing" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // Fetch user without password & refresh token
//     const user = await User.findById(decoded._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized, user not found" });
//     }

//     req.user = user; // store user in req
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       message: "Unauthorized",
//       error: err.message
//     });
//   }
// };

// export default protect;

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