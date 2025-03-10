import rateLimit from "express-rate-limit";

const userLimiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again after an hour!",
});
``;
export default userLimiter;
