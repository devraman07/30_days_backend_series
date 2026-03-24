import jwt from 'jsonwebtoken';

export const verifyUser  = async (req , res , next) => {
    try {
        const authHeader  = req.headers.authorization;
    

    if(!authHeader) {
        return res.json({
            message : "token missing",
        });
    }

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
    } catch (error) {
        return res.status(500).json({
            message : "error while authentication"
        })
    }

}