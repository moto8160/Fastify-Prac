// Application Layer（ユースケース・アプリの振る舞い）
// アプリの流れ。呼び出し順。

import { Post } from '../30_domain/post.entity';
import { PostRepository } from '../40_infrastructure/post.repository';

export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  // 省略しないと
  // constructor(postRepository: PostRepository) {
  //   this.postRepository = postRepository;
  // }

  // ユースケース
  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  async create(title: string, content: string): Promise<Post> {
    const post = new Post(title, content);
    return this.postRepository.create(post);
  }

  async update(id: number, title: string, content: string): Promise<Post> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post not found');
    }

    post.change(title, content);
    const newPost = await this.postRepository.update(post);

    return newPost;
  }

  async delete(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post not found');
    }

    await this.postRepository.delete(post);
  }
}
