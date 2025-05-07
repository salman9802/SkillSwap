import express from "express";

import userRouter from "./user.router";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API working");
});

router.use("/user", userRouter);

export default router;
