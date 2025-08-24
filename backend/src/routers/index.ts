import express from "express";

import userRouter from "./user.router";
import adminRouter from "./admin.router";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API working");
});

router.use("/user", userRouter);
router.use("/admin", adminRouter);

export default router;
