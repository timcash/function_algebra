const equal = require("assert").deepEqual;
const {
  getUserBalanceV2,
  verifyStep,
  authStep,
  userDataStep,
  balanceStep
} = require("./v2");
const { isFailure, isSuccess, payload } = require("./failable");

// ======================================
//
//        SECOND WAY getUserBalanceV2
//
// ======================================

test("should not be a valid user", async () => {
  const result = verifyStep(null);
  equal(isFailure(result), true);
  equal(payload(result), "please supply a valid user");
});

test.skip("should NOT go boom!", async () => {
  const result = await getUserBalanceV2(null);
  equal(isFailure(result), true);
  equal(payload(result), "please supply a valid user");
});

test.skip("should return not a valid user", async () => {
  const result = await getUserBalanceV2({ foo: "bar" });
  equal(isFailure(result), true);
  equal(payload(result), "please supply a valid user");
});

test.skip("should return user not authenticated", async () => {
  const result = await getUserBalanceV2({ name: "jack" });
  equal(isFailure(result), true);
  equal(payload(result), "user not authenticated");
});

test.skip("should return user had no items", async () => {
  const result = await getUserBalanceV2({ name: "tim" });
  equal(isFailure(result), true);
  equal(payload(result), "tim had no items");
});

test.skip("should return 60", async () => {
  const result = await getUserBalanceV2({ name: "carl" });
  equal(isSuccess(result), true);
  equal(payload(result), 60);
});
