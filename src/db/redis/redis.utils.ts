import { redisClient } from "./index";

export const create = async (accessToken: string, refreshToken: string) => {
  await redisClient.set(accessToken, refreshToken);
  await redisClient.expire(accessToken, 3600000); // 2 second expire time
  await redisClient.ttl(accessToken); //2
};
