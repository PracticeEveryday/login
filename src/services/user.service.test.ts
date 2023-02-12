import * as userService from "./user.service";

test("test를 실행하면 test를 뱉어냅니다.", () => {
  const test = userService.test();
  expect(test).toEqual("test");
});

describe("findOne 메서드 호출", () => {
  const email = "test1@test.com";
  const user = userService.findOneByEmail(email);
  test("userId 값은 1입니다.", () => {
    expect(user.userId).toBe(1);
    expect(user).toHaveProperty("userId");
  });

  test("email 값은 test1@test.com 입니다.", () => {
    expect(user.email).toBe("test1@test.com");
    expect(user).toHaveProperty("email");
  });

  test("password는 1234입니다.", () => {
    expect(user.password).toBe("1234");
    expect(user).toHaveProperty("password");
  });
});
