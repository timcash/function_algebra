// ======================================
//
//               IMPORTS
//
// ======================================

const co = require('co')

let userDB = {
  carl: {
    items: [
      {id: 1, price: 10},
      {id: 2, price: 20},
      {id: 3, price: 30}
    ]
  },
  tim: {}
}

// ======================================
//
//            HANDLERS / HELPERS
//
// ======================================

function isValidUser (u) {
  if (u.name) return true
  return false
}

function isUserAuthed (u) {
  let authed = false
  if (u.name === 'carl') authed = true
  if (u.name === 'tim') authed = true
  return Promise.resolve(authed)
}

function getUserData (u) {
  let userData = userDB[u.name]
  return Promise.resolve(userData)
}

// ======================================
//
//      FIRST WAY (Coordination functions)
//
// ======================================

const getUserBalanceV1 = co.wrap(function * (user, logger) {
  // not looking good
  if(isValidUser(user)) {
    // try inside of if... we have multiple code paths

    try {
      // yuck, injecting the logger dependency
      // and have to manually call it
      logger(`getting user ${user.name}`)

      // remember to think about async (dont forget the yield)
      // even with tests I have ended up with working code
      // because I was not depending on the result of the async
      // operation
      const authed = yield isUserAuthed(user)

      // notice that isUserAuthed and getUserData
      // return different types and I have to think
      // about (wire up) each one in a different way
      if(!authed) return 'not logged in'
      const userData = yield getUserData(user)

      // imperative logic in the coordiation function
      let total = 0
      userData.items.forEach(i => {
        total += i.price
      })

      // sometimes this function returns a string
      // sometimes it throws an error
      // sometimes it returns a number
      // all of them happen async
      return total
    } catch (e) {
      // here is that second code path
      return e.toString()
    }
  }
  return 'not a valid user'
})


// ======================================
//
//               SECOND WAY
//
// ======================================

// need to implement these function
function step1 () {return Promise.resolve()}
function step2 () {return Promise.resolve()}
function step3 () {return Promise.resolve()}
function step4 () {return Promise.resolve()}

function isFailure () {}
function isSuccess () {}
function getValue () {}

// Notice we still need to think about async and yield
const getUserBalanceV2 = co.wrap(function * (user, logger) {
  const s1 = step1(user)
  if (isFailure(s1)) return s1
  // logging like this is a pain how can we get it out of here?
  logger('the result of this step', s1)
  const s2 = yield step2(s1)
  if (isFailure(s2)) return s2
  const s3 = yield step3(s2)
  if (isFailure(s3)) return s3
  const s4 = yield step4(s3)
  return s4
})

// ======================================
//
//               THIRD WAY
//
// ======================================

// need to implement this function
function pipeline () {return Promise.resolve()}

const getUserBalanceV3 = pipeline([
  step1,
  step2,
  step3,
  step4
])

// ======================================
//
//          FOURTH WAY (monads?)
//
// ======================================

// const getUserBalanceV4 = ?




// ======================================
//
//               EXPORTS
//
// ======================================

module.exports = {
  getUserBalanceV1,
  getUserBalanceV2,
  getUserBalanceV3,
  getValue,
  isFailure,
  isSuccess
}
