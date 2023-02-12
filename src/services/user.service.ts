import { users } from "../db/users";

import { issueToken, Token } from "../utils/jwt.utils";
import * as redis from "../db/redis/redis.utils";

export const test = (): string => {
  return "test";
};

export const findOneByEmail = async (email: string, password: string): Promise<Token> => {
  const user = users.find((user) => user.email === email);
  if (!user) throw new Error("해당 유저가 존재하지 않습니다.");

  if (user.password !== password) {
    throw new Error("비밀번호가 틀립니다.");
  }

  const token = issueToken({ userId: user.userId });
  await redis.create(token.accessToken, token.refreshToken);

  return token;
};
