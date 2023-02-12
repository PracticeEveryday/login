import express, { Express, Request, Response } from "express";

import cors from "cors";
import dayjs from "dayjs";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import utc from "dayjs/plugin/utc";
import cookieParser from "cookie-parser";
import timezone from "dayjs/plugin/timezone";
import { userRouter } from "./apis/user.router";
import { redisRouter } from "./apis/redis.router";
import { errorMiddleware } from "./apis/miidlewares/error.middleware";

dayjs.extend(utc);
dayjs.extend(timezone);

dotenv.config(); // env환경변수 파일 가져오기

const app: Express = express();
const port = process.env.port;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  console.log(req.headers["user-agent"]);

  res.send("Typescript + Node.js + Express Server");
});

app.use("/users", userRouter);
app.use("/redis", redisRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
