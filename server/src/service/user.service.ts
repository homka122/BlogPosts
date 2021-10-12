import { User } from '../entities/User';
import { ApiError } from '../exceptions/ApiError';
import bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import { TokenService } from './token.service';

export class UserService {
  static async registration(username: string, password: string) {
    const candidate = await User.findOne({ username });

    if (candidate) {
      throw ApiError.BadRequest('Пользователь с таким именем уже существует');
    }

    const user = new User();
    const hashedPassword = bcrypt.hashSync(password, 7);
    user.username = username;
    user.password = hashedPassword;
    await user.save();

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });

    await TokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  static async login(username: string, password: string) {
    const candidate = await User.findOne({ username });

    if (!candidate) {
      throw ApiError.BadRequest('Пользователя с таким именем не существует');
    }

    const userDto = new UserDto(candidate);
    const tokens = TokenService.generateToken({ ...userDto });

    await TokenService.saveRefreshToken(candidate.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  static async logout(refreshToken: string) {
    await TokenService.deleteRefreshToken(refreshToken);
  }
}
