import * as redis from "redis";
import dotenv from "dotenv";

dotenv.config();

//* Redis 연결
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // 반드시 설정 !!
});

redisClient.on("connect", () => {
  console.log("Redis connected!");
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisClient.connect().then();

export { redisClient };
