import { verifyJWT } from '../utils.js'

export default async (req, res, next) => {
  const { headers: { authorization } } = req
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized to zone private.' })
  }
  const accessToken = authorization.split(' ')[1]
  try {
    req.username = await verifyJWT(accessToken)
    next()
  } catch (error) {
    console.log('error', error.message);
    next(error)
  }
}