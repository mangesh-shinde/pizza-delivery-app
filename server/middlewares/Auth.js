const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const authenticate = async (req, res, next) => {

    if(!req.cookies.jwt){
        return next("No user token found!")
    }

    try{
        const auth = jwt.verify(req.cookies.jwt, process.env.SECRET_ACCESS_TOKEN_KEY)
        const user =  await User.findById(auth.userId)
        if(!user){
            return next("User not found")
        }

        req.userId = auth.userId
        req.userEmail = auth.userEmail
        console.log("User authenticated")
        next()
    }
    catch(error){
         return next("User authentication failed !! Please re-login")
    }
}

module.exports = authenticate