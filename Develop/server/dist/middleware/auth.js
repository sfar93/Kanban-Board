import * as jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    else {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.sendStatus(500); // Internal Server Error if secret is not defined
        }
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden if token is invalid
            }
            req.user = user;
            return next();
        });
    }
    return; // Ensure all code paths return a value
};
