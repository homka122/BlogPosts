export class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(401, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(400, 'Пользователь не авторизован');
  }
}
