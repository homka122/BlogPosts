import { NextFunction, Request, Response } from 'express';
import { PostService } from '../service/post.service';

export class PostController {
  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, text } = req.body;
      const images = req.files as [];

      const post = await PostService.createPost(req.user.id, title, text, images);

      res.status(200).json({ message: 'Post created', post: post });
    } catch (e) {
      next(e);
    }
  }

  static async getPosts(req: Request, res: Response, next: NextFunction) {
    const posts = await PostService.getPosts();
    res.status(200).json(posts);
  }

  static async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId, title, text } = req.body;
      const images = req.files as [];

      const post = await PostService.updatePost(postId, title, text, images);

      res.json(post);
    } catch (e) {
      next(e);
    }
  }

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.body;

      const post = await PostService.deletePost(postId);

      res.json(post);
    } catch (e) {
      next(e);
    }
  }
}
