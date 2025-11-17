import { User } from "../models/userModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    console.log('Generating tokens for user ID:', userId);
    
    // Verify environment variables
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      console.error('JWT secrets are not configured');
      throw new Error('Server configuration error');
    }

    // Find user and validate
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found with ID:', userId);
      throw new Error('User not found');
    }

    console.log('User found, generating tokens...');
    
    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log('Tokens generated, saving refresh token...');

    if (!accessToken || !refreshToken) {
      console.error('Failed to generate one or both tokens');
      throw new Error('Failed to generate tokens');
    }

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    console.log('Tokens generated and saved successfully');
    return { accessToken, refreshToken };
    
  } catch (error) {
    console.error('Token generation error:', {
      message: error.message,
      stack: error.stack,
      userId,
      envVars: {
        hasAccessTokenSecret: !!process.env.ACCESS_TOKEN_SECRET,
        hasRefreshTokenSecret: !!process.env.REFRESH_TOKEN_SECRET
      }
    });
    throw new ApiError(
      500,
      error.message || 'Failed to generate tokens. Please try again.'
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "User with email or username is already exists.",
      []
    );
  }

  const user = await User.create({
    username,
    email,
    password,
    isEmailVerified: false,
  });

    const createdUser = await User.findById(user._id).select("-password -refreshToken",)

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user.")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                {user: createdUser},
                "User register successfully."
            )
        )
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
      ),
    );

    
});

export {
    registerUser,
    loginUser,
}
