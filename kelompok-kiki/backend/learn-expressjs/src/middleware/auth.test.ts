import { jwtMiddleware } from './auth';
import jwt from 'jsonwebtoken';

describe('jwtMiddleware', () => {
  const secretKey = 'your_secret_key';
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return 401 if no token is provided', () => {
    jwtMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Authorization token is required',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    req.headers.authorization = 'Bearer invalidtoken';
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('invalid');
    });

    jwtMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid or expired token',
    });
    expect(next).not.toHaveBeenCalled();
    (jwt.verify as jest.Mock).mockRestore();
  });

  it('should call next and attach user if token is valid', () => {
    const payload = { username: 'testuser' };
    const token = jwt.sign(payload, secretKey);
    req.headers.authorization = `Bearer ${token}`;
    jest.spyOn(jwt, 'verify').mockReturnValue();

    jwtMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    (jwt.verify as jest.Mock).mockRestore();
  });
});
