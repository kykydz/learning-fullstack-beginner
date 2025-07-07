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