import { NextFunction, Request, Response } from 'express';
import { check, ValidationError, validationResult } from 'express-validator';
import { ApiError } from '../exceptions/ApiError';

export class ValidationMiddleware {
  /**
   * Если значения не проходят валидацию, функция отправляет запрос с описанием ошибок
   * Функция всегда вызывается последней
   */
  static throwErrors() {
    return function (req: Request, res: Response, next: NextFunction) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest('Ошибка валидации', errors.array()));
      }
    };
  }

  static registration() {
    const usernameMinLenght = 3;
    const usernameMaxLenght = 30;
    const passwordMinLenght = 6;
    const passwordMaxLenght = 30;

    return [
      check('username')
        .isLength({ min: usernameMinLenght, max: usernameMaxLenght })
        .withMessage(`Длина имени пользователя должна быть от ${usernameMinLenght} до ${usernameMaxLenght} символов`)
        .isAlphanumeric()
        .withMessage('Имя пользователя должно включать в себя лишь латиницу и цифры'),
      check('password')
        .isLength({ min: passwordMinLenght, max: passwordMaxLenght })
        .withMessage(`Длина пароля должна быть от ${passwordMinLenght} до ${passwordMaxLenght} символов`)
        .isAlphanumeric()
        .withMessage('Пароль должен включать в себя лишь латиницу и цифры'),
      this.throwErrors(),
    ];
  }

  static createPostAndUpdate() {
    const titleMaxLenght = 255;
    const textMaxLenght = 30000;

    return [
      check('title')
        .isLength({ min: 1, max: titleMaxLenght })
        .withMessage(`Названиие поста не должно быть пустым или размером больше ${titleMaxLenght} символов`),
      check('text')
        .isLength({ min: 1, max: textMaxLenght })
        .withMessage(`Пост не может быть пустым или размером больше ${textMaxLenght} символов`),
      this.throwErrors(),
    ];
  }
}
