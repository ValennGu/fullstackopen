const info = (...params) => {
  if (process.env.NODE_ENV === 'test') return
  console.info('[info]', ...params)
}

const error = (...params) => {
  if (process.env.NODE_ENV === 'test') return
  console.error('[error]', ...params)
}

module.exports = { info, error }