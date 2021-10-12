import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

export class UserController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const userData = await UserService.registration(username, password);

      res.cookie('token', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const userData = await UserService.login(username, password);

      res.cookie('token', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.token;

      await UserService.logout(refreshToken);

      res.clearCookie('token');
      res.json({ message: 'Пользователь отлогинился' });
    } catch (e) {
      next(e);
    }
  }
}
