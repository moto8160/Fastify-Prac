// Presentation Layer（UI / Controller）
// HTTPの受け取り・返却。Serviceを呼ぶ。

import { FastifyInstance } from 'fastify';
import { PostService } from '../20_application/post.service';
import { createPostSchema, updatePostSchema } from './post.schema';

export async function postRoutes(app: FastifyInstance, postService: PostService) {
  app.get('/posts', async () => {
    return postService.findAll();
  });

  app.get('/posts/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const post = await postService.findById(Number(id));
      reply.status(200).send(post);
      // serviceでのエラーをキャッチ
      // 500 Internal Server Error にしない
    } catch (error) {
      reply.status(404).send({ message: (error as Error).message });
    }
  });

  app.post('/posts', { schema: createPostSchema }, async (request, reply) => {
    try {
      const { title, content } = request.body as { title: string; content: string };
      const post = await postService.create(title, content);
      reply.status(201).send(post);
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  });

  app.put('/posts/:id', { schema: updatePostSchema }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { title, content } = request.body as { title: string; content: string };
      const post = await postService.update(Number(id), title, content);
      reply.status(200).send(post);
    } catch (error) {
      // 自作の例外クラス作ればエラー受け不要
      if ((error as Error).message === 'Post not found') {
        reply.status(404).send({ message: (error as Error).message });
      } else {
        reply.status(400).send({ message: (error as Error).message });
      }
    }
  });

  app.delete('/posts/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      await postService.delete(Number(id));
      reply.status(204).send();
    } catch (error) {
      reply.status(404).send({ message: (error as Error).message });
    }
  });
}
