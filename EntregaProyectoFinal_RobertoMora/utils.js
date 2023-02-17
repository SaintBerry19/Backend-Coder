import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'shhhhhhhh'

export const generateToken = (user) => {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '24h' })
  return token
}

export const verifyJWT = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, PRIVATE_KEY, (error, decoded) => {
    if (error) {
      return reject(error)
    }
    resolve(decoded.data)
  })
})

export const encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

export const isValidPassword = (password, target) => {
  return bcrypt.compareSync(password, target)
}
