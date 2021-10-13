import { PostDto } from '../dto/post.dto';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { ApiError } from '../exceptions/ApiError';

export class PostService {
  static async createPost(creatorId: number, title: string, text: string): Promise<PostDto | {}> {
    const user = await User.findOne({ id: creatorId });

    if (user) {
      const post = new Post();
      post.title = title;
      post.text = text;
      post.creator = user;
      await post.save();

      const postDto = new PostDto(post);

      return postDto;
    }

    return {};
  }

  static async getPosts(): Promise<PostDto[]> {
    const posts = await Post.find({ relations: ['creator'] });
    const postsDto = posts.map((post) => new PostDto(post));
    return postsDto;
  }

  static async updatePost(postId: number, newTitle: string, newText: string): Promise<PostDto> {
    const post = await Post.findOne({ id: postId }, { relations: ['creator'] });

    if (!post) {
      throw ApiError.BadRequest('Поста с таким id нет');
    }

    post.title = newTitle;
    post.text = newText;
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
