import jwt from "jsonwebtoken"

export const verifyToken = async (req , res , next) => {
    try {
        const token = req.cookies.authToken
        if(!token){
            return res.status(400).json({message : "Unauthorized user.."})
        }
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        if(!payload){
            return res.status(400).json({message : "Unauthorized user.."})
        }
        req.userId = payload.userId
        next();
    } catch (error) {
        return res.status(500).json({message : "Server issue.." ,})
    }
}