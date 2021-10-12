import { User } from '../entities/User';

export class UserDto {
  username: string;
  id: number;

  constructor(user: User) {
    this.username = user.username;
    this.id = user.id;
  }
}
