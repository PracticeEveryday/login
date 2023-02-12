import dayjs from "dayjs";
import { Router, Request, Response } from "express";

import { redisClient } from "../db/redis";
import * as userService from "../services/user.service";

const userRouter = Router();

userRouter.get("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken } = await userService.findOneByEmail(email, password);

  res.cookie("refreshToken", refreshToken, { expires: dayjs(Date.now() + 3600000).toDate(), httpOnly: true });

  res.status(200).json({ result: accessToken });
});

userRouter.delete("/redis", async (req: Request, res: Response) => {
  const token = req.body.accessToken;

  await redisClient.del(token);
  res.status(200).json({ status: "succ" });
});

export { userRouter };
