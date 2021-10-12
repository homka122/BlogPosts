export class PostDto {
  title: string;
  text: number;
  id: number;
  creatorUsername?: string;

  constructor(post: any) {
    this.title = post.title;
    this.text = post.text;
    this.id = post.id;
    if (post?.creator?.username) {
      this.creatorUsername = post.creator.username;
    }
  }
}
