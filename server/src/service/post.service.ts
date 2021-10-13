import multer from 'multer';
import { PostDto } from '../dto/post.dto';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { ApiError } from '../exceptions/ApiError';

const postsOnPage = 20;

export class PostService {
  static updateImagesInText(text: string, images: any[]) {
    const updatedText = text
      .split('\n')
      .map((row) => {
        if (row.startsWith('[i]')) {
          const filenameInText = row.slice(3, -3);
          const file = images.find((image) => image.originalname === filenameInText);

          if (!file) {
            throw ApiError.BadRequest(`Фото с таким названием [${filenameInText}] нет`);
          }

          return row.replace(filenameInText, file.filename);
        }
        return row;
      })
      .join('\n');

    return updatedText;
  }

  static async createPost(creatorId: number, title: string, text: string, images: any[]): Promise<PostDto> {
    const user = await User.findOne({ id: creatorId });

    if (!user) {
      throw ApiError.BadRequest('Пользователя с таким id нет');
    }

    const updatedText = this.updateImagesInText(text, images);

    const post = new Post();
    post.title = title;
    post.text = updatedText;
    post.creator = user;
    await post.save();

    const postDto = new PostDto(post);

    return postDto;
  }

  static async getPosts(page?: number): Promise<PostDto[]> {
    const skip = page ? (page - 1) * postsOnPage : 0;
    const posts = await Post.find({ relations: ['creator'], take: postsOnPage, skip, order: { createdAt: 'DESC' } });

    const postsDto = posts.map((post) => new PostDto(post));
    return postsDto;
  }

  static async getPagesCount(): Promise<number> {
    const count = await Post.count();
    return Math.ceil(count / postsOnPage);
  }

  static async updatePost(postId: number, newTitle: string, newText: string, images: any[]): Promise<PostDto> {
    const post = await Post.findOne({ id: postId }, { relations: ['creator'] });

    if (!post) {
      throw ApiError.BadRequest('Поста с таким id нет');
    }

    const updatedNewText = this.updateImagesInText(newText, images);

    post.title = newTitle;
    post.text = updatedNewText;
    await post.save();

    return new PostDto(post);
  }

  static async deletePost(postId: number): Promise<PostDto> {
    const post = await Post.findOne({ id: postId }, { relations: ['creator'] });

    if (!post) {
      throw ApiError.BadRequest('Поста с таким id нет');
    }

    const postDto = new PostDto(post);
    await post.remove();
    return postDto;
  }
}
