import { Router } from "express";

import { redisClient } from "../db/redis";

const redisRouter = Router();
// 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용
const redisCli = redisClient.v4;

redisRouter.get("/", async (req, res, next) => {
  const test = await redisCli.get("username");
  console.log(test);
  res.status(200).json(test);
});

redisRouter.post("/", async (req, res, next) => {
  const result = await redisCli.set("username", "inpa");
  res.status(201).json(result);
});

redisRouter.delete("/", async (req, res, next) => {
  const existedValuue = await redisCli.exists("username");
  // true: 1 , false: 0

  if (existedValuue) await redisCli.del("username");
  res.status(200).json({ status: "succ" });
});

redisRouter.put("/rename", async (req, res, next) => {
  const result = await redisCli.rename("username", "helloname");
  res.status(200).json(result);
});

export { redisRouter };
