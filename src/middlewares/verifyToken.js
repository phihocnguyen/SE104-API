const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verifyToken = (req, res, next) => {
    const accessToken = req.cookies.token
    if (accessToken) {
        jwt.verify(accessToken, process.env.TOKEN_SECRET, (error, user) => {
            if (error) next(error)
            else {
                req.user = user
                next()
            }
        })
    } else {
        res.status(401).json('Authentication failed')
    }
}

exports.verifyAdmin = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if (req.user.role) next()
        else res.status(403).json('Unauthorized')
    })
}
