export class PostDto {
  title: string;
  text: number;
  id: number;
  creatorUsername?: string;
  createdAt: Date;

  constructor(post: any) {
    this.title = post.title;
    this.text = post.text;
    this.id = post.id;
    this.createdAt = post.createdAt;
    if (post?.creator?.username) {
      this.creatorUsername = post.creator.username;
    }
  }
}
