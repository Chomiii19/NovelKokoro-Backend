import { Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import signToken from "../utils/signToken";
import AppError from "../utils/appError";

const createSendToken = (id: number, statusCode: number, res: Response) => {
  const token = signToken(id);

  const cookieOption = {
    maxAge: Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none" as "none",
    path: "/",
  };

  res.cookie("authToken", token, cookieOption);
  res.status(statusCode).json({ status: "Success" });
};

const signup = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new AppError("Please input your username and password", 400));

  const user = await User.create({ username, password });
  createSendToken(user._id, 201, res);
});

const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new AppError("Please input your username and password", 400));

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.comparePassword(password)))
    return next(new AppError("Invalid username or password", 400));

  createSendToken(user._id, 200, res);
});

const logout = catchAsync(async (req, res, next) => {
  res.cookie("authToken", "", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    secure: process.env.NDDE_ENV === "DEVELOPMENT" ? false : true,
    sameSite: "none",
    path: "/",
  });
});

export { signup, login, logout };
