import express, { Express, Request, Response } from "express";

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import { userRouter } from "./apis/user.router";
import { redisRouter } from "./apis/redis.router";

dotenv.config(); // env환경변수 파일 가져오기

const app: Express = express();
const port = process.env.port;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log(req.headers["user-agent"]);

  res.send("Typescript + Node.js + Express Server");
});

app.use("/users", userRouter);
app.use("/redis", redisRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
