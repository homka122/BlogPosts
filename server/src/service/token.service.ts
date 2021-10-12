import jwt from 'jsonwebtoken';
import { Token } from '../entities/Token';
import { User } from '../entities/User';
import { ApiError } from '../exceptions/ApiError';

export class TokenService {
  static generateToken(payload: { username: string }) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '60d' });

    return { accessToken, refreshToken };
  }

  static async saveRefreshToken(userId: number, refreshToken: string) {
    const tokenCandidate = await Token.findOne({ userId });
    if (tokenCandidate) {
      tokenCandidate.refreshToken = refreshToken;
      await tokenCandidate.save();
      return;
    }

    const user = await User.findOne({ id: userId });
    const token = new Token();
    token.refreshToken = refreshToken;
    token.user = user as User;
    await token.save();

    user!.refreshToken = token;
    await user!.save();
  }

  static async deleteToken(refreshToken: string) {
    const tokenToDelete = await Token.findOne({ refreshToken });
    if (tokenToDelete) {
      await tokenToDelete.remove();
    } else {
      throw ApiError.UnauthorizedError();
    }
  }
}
