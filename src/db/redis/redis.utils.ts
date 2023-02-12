import { redisClient } from "./index";

export const create = async (accessToken: string, refreshToken: string, userId: number) => {
  await redisClient.set(accessToken, JSON.stringify({ refreshToken, userId }));
  await redisClient.expire(accessToken, 30 * 24 * 60 * 1000); // 30일
};
