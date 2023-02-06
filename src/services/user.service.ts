
import { users } from "../db/users"

import { UserInfo } from "../interfaces/userInfo"

export const test = (): string => {
    return "test"
}

export const findOne = (email: string): UserInfo => {
    const user = users.find((user) => user.email === email)

    return user
}