function failable (nothing, value, error, meta) {
  if (nothing) return {nothing, meta}
  if (value) return {value, meta}
  if (error) return {error, meta}
  return {error: 'no failable type', meta}
}

function success (value, meta) {
  return failable(false, value, undefined, meta)
}

function failure (error, meta) {
  return failable(false, undefined, err, meta)
}

function empty (meta) {
  return failable(true, undefined, undefined, meta)
}

function isSuccess (a) {
  return a.hasOwnProperty('value')
}

function isFailure (a) {
  return a.hasOwnProperty('error')
}

function isEmpty (a) {
  return a.hasOwnProperty('nothing')
}
