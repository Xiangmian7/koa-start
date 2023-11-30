const jwt = require('jsonwebtoken')
const { PUBLIC_KEY, PRIVATE_KEY } = require('../initialize/config')
const makeToken = (id, roleId, username) => {
  return jwt.sign({ id, roleId, username }, PRIVATE_KEY, {
    expiresIn: '12h',
    algorithm: 'RS256',
  })
}

const parseToken = tokenString => {
  return jwt.verify(tokenString, PUBLIC_KEY, { algorithm: ['RS256'] })
}

module.exports = { makeToken, parseToken }
