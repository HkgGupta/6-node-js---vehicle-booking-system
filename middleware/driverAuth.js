import jwt from "jsonwebtoken";

export const driverCheckAuth = async (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            const DRIVER_SECRET_KEY = process.env.DRIVER_SECRET_KEY;

            const verify = await jwt.verify(token, DRIVER_SECRET_KEY);

            if (verify) {
                req.driverInfo = verify.credential;
                next();
            } else {
                return res.status(401).json({
                    Error: "Unauthorized"
                });
            }
        } else {
            return res.status(401).json({
                Error: "Unauthorized"
            });
        }
    } catch (error) {
        return res.status(401).json({
            Error: error
        });
    }
}