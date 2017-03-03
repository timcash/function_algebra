// ======================================
//
//               IMPORTS
//
// ======================================
let userDB = {
  carl: {
    items: [{ id: 1, price: 10 }, { id: 2, price: 20 }, { id: 3, price: 30 }]
  },
  tim: {}
};

// ======================================
//
//            HANDLERS / HELPERS
//
// ======================================

function isValidUser(u) {
  if (u.name) return true;
  return false;
}

async function isUserAuthed(u) {
  let authed = false;
  if (u.name === "carl") authed = true;
  if (u.name === "tim") authed = true;
  return authed;
}

async function getUserData(u) {
  let userData = userDB[u.name];
  return userData;
}

module.exports = {
  getUserData,
  isUserAuthed,
  isValidUser
};
