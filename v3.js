const { isFailure, payload } = require("./failable");
const { isUserAuthed, getUserData, isValidUser } = require("./api");
const {
  verifyStep,
  authStep,
  userDataStep,
  balanceStep
} = require("./v2");
// ======================================
//
//               THIRD WAY
//
// ======================================

// need to implement this function
function pipeline() {
  return Promise.resolve();
}

const getUserBalanceV3 = pipeline([
  verifyStep,
  authStep,
  userDataStep,
  balanceStep
]);

// ======================================
//
//               EXPORTS
//
// ======================================

module.exports = {
  getUserBalanceV3
};
