// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const secretKey = 'abc_key_123'; // Replace with your actual secret key

// export const jwtMiddleware = (req: any, res: any, next: NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header


//     if (!token) {
//         return res.status(401).json({ error: 'Authorization token is required' });
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey); // Verify the token
//         req.user = decoded; // Attach decoded payload to the request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error('JWT verification failed:', error);
//         return res.status(403).json({ error: 'Invalid or expired token' });
//     }
// };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'abc_key_123'; // Sama seperti yang dipakai saat generate token

// Definisi tipe Request yang membawa payload user
interface AuthenticatedRequest extends Request {
  user?: { username: string };
}

// Middleware untuk verifikasi JWT
export const jwtMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token is required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { username: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }
};

// Middleware untuk membatasi akses hanya pada username tertentu
export const restrictTo = (allowedUsername: string) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (req.user?.username !== allowedUsername) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }
    next();
  };
};
