import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./controllers/globalErrorHandler";
import AppError from "./utils/appError";
import authRoutes from "./routes/authRoutes";
import appRoutes from "./routes/appRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/app", appRoutes);
app.use("*", (req: Request, res: Response, next: NextFunction) =>
  next(new AppError(`Cannot find ${req.originalUrl} from the server`, 404))
);
app.use(globalErrorHandler);

export default app;
