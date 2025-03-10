import { Document } from "mongoose";

interface IUser extends Document {
  _id: number;
  username: string;
  role: string;
  password: string;
  followedManga: number[];
  readChapters: { mangaId: number; latestRead: number }[];
  comparePassword(password: string): Promise<boolean>;
}

export { IUser };
