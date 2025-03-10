import User from "../models/userModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import verifyToken from "../utils/verifyToken";

const protectPage = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return next(new AppError("No cookie detected", 403));

  const decodedToken = verifyToken(token);
  const user = await User.findById({ decodedToken });

  if (!user)
    return next(
      new AppError("The user belonging with this token doesn't exist", 404)
    );

  res.status(200).json({ data: { user } });
});

export default protectPage;
