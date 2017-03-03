const { isFailure, failure, success, empty } = require("./failable");
const { isUserAuthed, getUserData, isValidUser } = require("./api");

// ======================================
//
//               SECOND WAY
//
// ======================================

// need to implement these function
function verifyStep() {
  return;
}
async function authStep() {
  return;
}
async function userDataStep() {
  return;
}
async function balanceStep() {
  return;
}

// Notice we still need to think about async
async function getUserBalanceV2(user) {
  const s1 = verifyStep(user);
  if (isFailure(s1)) return s1;
  const s2 = await authStep(s1);
  if (isFailure(s2)) return s2;
  const s3 = await userDataStep(s2);
  if (isFailure(s3)) return s3;
  const s4 = await balanceStep(s3);
  return s4;
}

// ======================================
//
//               EXPORTS
//
// ======================================

module.exports = {
  getUserBalanceV2,
  verifyStep,
  authStep,
  userDataStep,
  balanceStep
};
