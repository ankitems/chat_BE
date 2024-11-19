import express from "express";
import chatRoute from "./chat.routes.js";
import userRoute from "./user.routes.js";

const router = express.Router();

router.use(chatRoute);
router.use(userRoute)
export default router;
