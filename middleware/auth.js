const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    //! get token from headers
    const token = req.header('x-auth-token')
    if(!token){
        //* 401 = unauthorized
        return res.status(401).json({ msg: 'no token, authorization denied' })
    }
    try {
        //! extract payload
        //* in production, the jwtSecret should be random-generated string || customised ?
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({msg: 'Invalid token '})
    }
}