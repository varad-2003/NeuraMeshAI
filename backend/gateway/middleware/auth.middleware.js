import redis from "../../shared/redis/redis.js"

const protect = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session
        console.log("Session from cookie:", req.cookies.session);
        if(!sessionId){
            return res.status(400).json({message:"Unauthorized"})
        }
        const session = await redis.get(`session-${sessionId}`)
        console.log("Redis session:", session);
        if(!session){
            return res.status(400).json({message:"session expired"})
        }
        req.user = JSON.parse(session)
        console.log("Protect Passed");
        next()

    } catch (error) {
         return res.status(500).json({message:"middleware error"})
    }
}

export default protect