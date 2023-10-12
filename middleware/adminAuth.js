import jwt from "jsonwebtoken";

export const adminCheckAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

            const verify = await jwt.verify(token, ADMIN_SECRET_KEY);

            if (verify) {
                req.adminInfo = verify.credential;
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
};