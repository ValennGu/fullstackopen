const info = (...params) => {
  console.info('[info]', ...params)
}

const error = (...params) => {
  console.error('[error]', ...params)
}

module.exports = { info, error }