import dayjs from "dayjs";
import { Router, Request, Response, NextFunction } from "express";

import { redisClient } from "../db/redis";
import * as userService from "../services/user.service";
import { jwtMiddleware } from "./miidlewares/jwt.middleware";

const userRouter = Router();
const redisCli = redisClient.v4;

userRouter.get("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken } = await userService.login(email, password);

  res.cookie("refreshToken", refreshToken, { expires: dayjs(Date.now() + 1 * 60 * 1000).toDate(), httpOnly: true });

  res.status(200).json({ result: { accessToken } });
});

userRouter.get("/:userId", jwtMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const user = userService.findOneById(+userId);

    res.status(200).json(user);
  } catch (error) {
    next();
  }
});

userRouter.get("/cookies", jwtMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.cookies;

    res.status(200).json(cookie);
  } catch (error) {
    next();
  }
});

userRouter.delete("/redis", async (req: Request, res: Response) => {
  const token = req.body.accessToken;

  await redisCli.del(token);
  res.status(200).json({ status: "succ" });
});

export { userRouter };
