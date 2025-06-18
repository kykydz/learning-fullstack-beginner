import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Replace with your actual secret key

export const jwtMiddleware = (req: any, res: any, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header


    if (!token) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }


    try {
        const decoded = jwt.verify(token, secretKey); // Verify the token
        req.user = decoded; // Attach decoded payload to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
