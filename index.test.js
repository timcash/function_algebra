const co = require('co')
const equal = require('assert').deepEqual
const {
  getUserBalanceV1,
  getUserBalanceV2,
  getUserBalanceV3,
  getValue,
  isFailure,
  isSuccess
} = require('./index')

// ======================================
//
//      FIRST WAY getUserBalanceV1
//
// ======================================

test('should go boom!', co.wrap(function * (){
  try {
    const result = yield getUserBalanceV1(null, ()=>{})
  } catch (e) {
    equal(e.toString(), 'TypeError: Cannot read property \'name\' of null')
  }
}))

test('should return not a valid user', co.wrap(function * (){
  const result = yield getUserBalanceV1({foo: 'bar'}, ()=>{})
  equal(result, 'not a valid user')
}))

test('should give a TypeError with no items', co.wrap(function * () {
  const result = yield getUserBalanceV1({name: 'tim'}, ()=>{})
  equal(result , 'TypeError: Cannot read property \'forEach\' of undefined')
}))

test('should return the balance', co.wrap(function * (){
  const result = yield getUserBalanceV1({name: 'carl'}, ()=>{})
  equal(result, 60)
}))

// ======================================
//
//        SECOND WAY getUserBalanceV2
//
// ======================================

test.skip('should NOT go boom!', co.wrap(function * (){
  const result = yield getUserBalanceV2(null, ()=>{})
  equal(isFailure(result), true)
  equal(getValue(result), 'please supply a valid user')
}))

test.skip('should return not a valid user', co.wrap(function * (){
  const result = yield getUserBalanceV2({foo: 'bar'}, ()=>{})
  equal(isFailure(result), true)
  equal(getValue(result), 'please supply a valid user')
}))

test.skip('should return user had no items', co.wrap(function * (){
  const result = yield getUserBalanceV2({name: 'tim'}, ()=>{})
  equal(isFailure(result), true)
  equal(getValue(result), 'tim had no items')
}))

test.skip('should return 60', co.wrap(function * (){
  const result = yield getUserBalanceV2({name: 'carl'}, ()=>{})
  equal(isSuccess(result), true)
  equal(getValue(result), 60)
}))

// ======================================
//
//       THIRD WAY getUserBalanceV3
//
// ======================================

test.skip('should NOT go boom!', co.wrap(function * (){
  const result = yield getUserBalanceV3(null, ()=>{})
  equal(isFailure(result), true)
  equal(getValue(result), 'please supply a valid user')
}))

test.skip('should return not a valid user', co.wrap(function * (){
  const result = yield getUserBalanceV3({foo: 'bar'}, ()=>{})
  equal(isFailure(result), true)
  equal(getValue(result), 'please supply a valid user')
}))

test.skip('should return user had no items', co.wrap(function * (){
  const result = yield getUserBalanceV3({name: 'tim'}, ()=>{})
  equal(isFailure(result), true)
  equal(getValue(result), 'tim had no items')
}))

test.skip('should return 60', co.wrap(function * (){
  const result = yield getUserBalanceV3({name: 'carl'}, ()=>{})
  equal(isSuccess(result), true)
  equal(getValue(result), 60)
}))
