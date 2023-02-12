import { Router, Request, Response } from "express";
import * as userService from "../services/user.service";

const userRouter = Router();

userRouter.get("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await userService.findOneByEmail(email, password);

  res.status(200).json({ result: token });
});

export { userRouter };
