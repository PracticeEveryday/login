import { Router, Request, Response } from "express"
import * as userService from "../services/user.service"
import { issueToken } from "../utils/jwt.utils"

const userRouter = Router()

userRouter.get("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = userService.findOne(email)

    if (user.password !== password) {
        throw new Error("비밀번호가 틀립니다.")
    }

    const token = issueToken({userId: user.userId})
    res.status(200).json({result: token})
})

export { userRouter }