import * as jwt from "jsonwebtoken"

type JwtPayload = {
    userId: number
}

type Token ={
    accessToken: string;
    refreshToken: string;
}

export const issueToken = (obj: JwtPayload): Token => {
    const JWT_KEY = "test1234"
    const accessToken = jwt.sign(obj, JWT_KEY, {expiresIn: "1h"})
    const refreshToken = jwt.sign({}, JWT_KEY, {expiresIn: "30d"})

    return { accessToken, refreshToken }
}