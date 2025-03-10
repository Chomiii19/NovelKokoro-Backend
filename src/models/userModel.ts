import mongoose from "mongoose";
import { NextFunction } from "express";
import { IUser } from "../@types/userInterfaces";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: [true, "A uster must have a username"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  followedManga: {
    type: [Number],
  },
  readChapters: {
    type: [{ mangaId: Number, latestRead: Number }],
  },
});

// @ts-ignore
userSchema.pre("save", async function (this: IUser, next: NextFunction) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("user", userSchema);
export default User;
