// Infrastructure Layer（Repository / DB / 外部API）
// データ操作だけ。エラー投げない。

import { Post } from '../30_domain/post.entity';

export class PostRepository {
  private posts: Post[] = [];
  private currentId = 1;

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

  async findById(id: number): Promise<Post | null> {
    return this.posts.find((p) => p.getId() === id) ?? null;
  }

  async create(post: Post): Promise<Post> {
    post.setId(this.currentId++);
    this.posts.push(post);
    return post;
  }

  async update(post: Post): Promise<Post> {
    const index = this.posts.findIndex((p) => p.getId() === post.getId());
    this.posts[index] = post;
    return post;
  }

  async delete(post: Post): Promise<void> {
    // posts配列のidと受け取ったpostのidが異なるものだけで新しい配列を作成
    this.posts = this.posts.filter((p) => p.getId() !== post.getId());
  }
}
