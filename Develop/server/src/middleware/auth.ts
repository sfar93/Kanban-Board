import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
import jwt from "jsonwebtoken";


interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
    
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token){
    return res.sendStatus (401);;
  }
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    return res.sendStatus(500); // Internal Server Error if secret is not defined
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user as JwtPayload;
    return next();
  });
  return; 
}