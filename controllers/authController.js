import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';

//generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//regiter a new user
const registerUser = catchAsyncError(async (req, res) => {
  const { name, email, phone, password } = req.body;

  //checking if all fields are provided
  if (!name || !email || !phone || !password) {
    return next(new ErrorHandler("Please Provide all required fields", 400));
  }

  //checking if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }

  //create new user
  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  if (!user) {
    return next(new ErrorHandler("Invalid User data", 400));
  }

  //if user created successfully
  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    id: user._id,
    name: user.name,
    phone: user.phone,
  });
});

//login user
const loginUser = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  //checking if email and password is provided
  if (!email || !password) {
    return next(new ErrorHandler("Please provide Email and Password", 400));
  }

  //find user by email
  const user = await User.findOne({ email }).select("+password");

  //checking if user exists and password matches
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid Credentials", 400));
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
});


export {registerUser, loginUser};