const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    const token = req.headers["authorization"].split(' ')[1]
    try {
        const jwtResponse=token.verify(token,process.env.JWT_SECRETKEY)
        req.payload=jwtResponse.userId
        next()

    } catch (error) {
        res.status(404).json(`Authorization failed due to ${error}`)
    }
}

module.exports=jwtMiddleware