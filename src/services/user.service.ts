import { users } from "../db/users";

import * as redis from "../db/redis/redis.utils";
import { UserInfo } from "../interfaces/userInfo";
import { issueToken, Token } from "../utils/jwt.utils";

export const test = (): string => {
  return "test";
};

export const login = async (email: string, password: string): Promise<Token> => {
  const user = users.find((user) => user.email === email);
  if (!user) throw new Error("해당 유저가 존재하지 않습니다.");

  if (user.password !== password) {
    throw new Error("비밀번호가 틀립니다.");
  }

  const token = issueToken({ userId: user.userId });
  await redis.create(token.accessToken, token.refreshToken, user.userId);

  return token;
};

export const findOneById = (userId: number): UserInfo => {
  const user = users.find((user) => user.userId === userId);
  if (!user) throw new Error("해당 유저가 존재하지 않습니다.");

  return user;
};
