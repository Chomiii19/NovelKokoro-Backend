import express from "express";
import * as appController from "../controllers/appController";
import protect from "../middlewares/protect";

const router = express.Router();

router.route("/followed-manga").patch(protect, appController.followManga);
router.route("/read-chapters").patch(protect, appController.readChapters);

export default router;
