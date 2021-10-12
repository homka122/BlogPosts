import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { TokenService } from '../service/token.service';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(ApiError.UnauthorizedError());
  }

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) {
    return next(ApiError.UnauthorizedError());
  }

  const userData = TokenService.validateAccessToken(accessToken);
  if (!userData) {
    return next(ApiError.UnauthorizedError());
  }

  req.user = userData;
  next();
}
