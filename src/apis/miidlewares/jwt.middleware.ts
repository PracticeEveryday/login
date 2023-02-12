import dayjs from "dayjs";
import { TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { redisClient } from "../../db/redis";

import * as redis from "../../db/redis/redis.utils";
import { decodeToken, issueToken } from "../../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

const redisCli = redisClient.v4;

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const ACCESSTOKEN_IDX = 1;
  const ACCESSTOKEN_HEADERS_LOCATE = "authorization";

  if (!req.headers[ACCESSTOKEN_HEADERS_LOCATE]) throw new Error("토큰이 없습니다.");
  const accessToken = req.headers[ACCESSTOKEN_HEADERS_LOCATE].split(" ")[ACCESSTOKEN_IDX].trim();

  try {
    const decoded = await decodeToken(accessToken);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      const { refreshToken } = req.cookies;

      const isExist = await redisCli.exists(accessToken);
      const getRefreshToken = JSON.parse(await redisCli.get(accessToken));

      // 남은 시간 조절도 가능
      // const isLived = await redisCli.ttl(accessToken);

      if (!isExist) {
        throw new Error("해당 토큰이 존재하지 않습니다.");
      }

      if (refreshToken !== getRefreshToken.refreshToken) {
        throw new Error("refreshToken이 일치하지 않습니다.");
      }

      try {
        await decodeToken(refreshToken);
      } catch (error) {
        if (error instanceof TokenExpiredError) throw new Error("로그인을 다시 해주세요");
        next(error);
      }

      const userId = getRefreshToken.userId;
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = issueToken({ userId });

      await redis.create(newAccessToken, newRefreshToken, userId);

      res.cookie("refreshToken", newRefreshToken, { expires: dayjs(Date.now() + 1 * 60 * 1000).toDate(), httpOnly: true });
      res.status(200).json({ newAccessToken });
      return;
    }
    next(error);
  }
};
