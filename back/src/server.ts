import Fastify from 'fastify';
import { PostRepository } from './modules/post/40_infrastructure/post.repository';
import { PostService } from './modules/post/20_application/post.service';
import { postRoutes } from './modules/post/10_presentation/post.route';

// fastifyのインスタンスを作成
const fastify = Fastify({ logger: true });

// レイヤードアーキテクチャ（4層）ドメインのルールが多い時
// ----------------------------------------------------
// Presentation（Route）
//   - HTTPを受け取り、Serviceを呼ぶ
//         ↓
// Application（Service）
//   - ユースケースを実行
//   - Domainを利用し、Repositoryを呼ぶ
//         ↓
// Domain（Entity）
//   - エンティティ・ビジネスロジックの定義
//         ↓
// Infrastructure（Repository）
//   - データ保存や外部技術の実装
// ----------------------------------------------------
// 3層にするなら・・・
// Presentation（Route）
//         ↓
// Business（Service + Domain）
//         ↓
// Infrastructure（Repository）
// ----------------------------------------------------

// repositoryのインスタンスを作成
const postRepository = new PostRepository();

// serviceのインスタンスを作成
const postService = new PostService(postRepository);

// Routeの登録
fastify.register((app) => postRoutes(app, postService));

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
