import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';
import { ApiError } from '../exceptions/ApiError';

export function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../static'));
    },
    filename: (req, file, cb) => {
      cb(null, v4() + '.jpg');
    },
  });

  const upload = multer({
    storage: diskStorage,
    limits: {
      fileSize: 10000000,
    },
  }).array('images', 25);

  upload(req, res, (err) => {
    if (err) {
      next(ApiError.BadRequest('Ошибка при загрузке файла (Максимальный размер файла - 10мб, максимальное кол-во - 20 шт)', err));
    }

    next();
  });
}
