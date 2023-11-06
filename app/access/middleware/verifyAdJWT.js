const jwt = require('jsonwebtoken')

const ApiResponse = require('../../helper/apiResponse')
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return ApiResponse.unauthorized(res)
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return ApiResponse.forbidden(res)
            req.user_id=decoded.user_info.id
            req.user = decoded.user_info.username
            req.email = decoded.email
            next()
        }
    )
}

module.exports = verifyJWT 