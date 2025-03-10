import User from "../models/userModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const followManga = catchAsync(async (req, res, next) => {
  const { mangaId } = req.body;

  if (!req.user) return next(new AppError("User not logged in", 403));

  const user = await User.findById(req.user._id);

  if (!user) return next(new AppError("User not found", 404));

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $push: { followedManga: mangaId } },
    { new: true }
  );
  if (!updatedUser) return next(new AppError("Invalid update request", 404));

  res.status(200).json({ message: "Success" });
});

const readChapters = catchAsync(async (req, res, next) => {
  const { chapNum, mangaId } = req.body;

  if (!req.user) return next(new AppError("User not logged in", 404));

  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError("User not found", 404));

  // Find existing progress
  const mangaProgress = user.readChapters.find(
    (manga) => manga.mangaId === mangaId // Direct number comparison
  );

  if (mangaProgress) {
    if (mangaProgress.latestRead > chapNum) {
      return next(new AppError("You haven't read previous chapters.", 400));
    }
    mangaProgress.latestRead = chapNum;
  } else {
    user.readChapters.push({ mangaId, latestRead: chapNum });
  }

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Chapter progress updated successfully.",
  });
});

export { followManga, readChapters };
