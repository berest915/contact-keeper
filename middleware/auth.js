const jwt = require('jsonwebtoken')
// const config = require('config')
// const dot = require('dotenv').config()

module.exports = (req, res, next) => {
    //! get token from headers
    const token = req.header('x-auth-token')
   
    if (!token) {
        //* 401 = unauthorized
        return res.status(401).json({ msg: 'no token, authorization denied' })
    }
    try {
        //! extract payload
        //* in production, the jwtSecret should be random-generated string || customised ?
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //! only extract user into req.user
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token ' })
    }
}
// module.exports = auth
//? jwt for each device is individual, allow same user able to access to the system by using different jwt
