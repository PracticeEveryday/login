import * as jwt from "jsonwebtoken";

type tokenPayload = {
  userId: number;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export interface JwtPayLoad extends jwt.JwtPayload {
  userId: number;
}

const JWT_KEY = "test1234";

export const issueToken = (obj: tokenPayload): Token => {
  const accessToken = jwt.sign(obj, JWT_KEY, { expiresIn: "1h" });
  const refreshToken = jwt.sign({}, JWT_KEY, { expiresIn: "30d" });

  return { accessToken, refreshToken };
};

export const decodeToken = async (token: string): Promise<JwtPayLoad> => {
  const decoded = (await jwt.verify(token, JWT_KEY)) as JwtPayLoad;

  const copyDecoded = Object.assign({}, decoded);

  return copyDecoded;
};
