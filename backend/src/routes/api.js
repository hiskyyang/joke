import express from "express";
const router = express.Router();

import jokes from "./api-dad-jokes.js";
router.use("/dad-jokes", jokes);

export default router;