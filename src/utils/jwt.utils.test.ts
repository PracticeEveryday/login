import * as jwtUtils from "./jwt.utils"

test("토큰 재발급 시 accessToken과 refreshToken을 반환한다.", () => {
    const token = jwtUtils.issueToken({ userId: 1 })
    expect(token).toHaveProperty("accessToken")
    expect(token).toHaveProperty("refreshToken")
})