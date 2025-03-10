"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var globalErrorHandler_1 = __importDefault(require("./controllers/globalErrorHandler"));
var appError_1 = __importDefault(require("./utils/appError"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var appRoutes_1 = __importDefault(require("./routes/appRoutes"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/users", authRoutes_1.default);
app.use("/api/v1/app", appRoutes_1.default);
app.use("*", function (req, res, next) {
    return next(new appError_1.default("Cannot find ".concat(req.originalUrl, " from the server"), 404));
});
app.use(globalErrorHandler_1.default);
exports.default = app;
