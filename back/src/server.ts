import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import { PostRepository } from './modules/post/40_infrastructure/post.repository';
import { PostService } from './modules/post/20_application/post.service';
import { postRoutes } from './modules/post/10_presentation/post.route';
import { UserRepository } from './modules/user/40_infrastructure/user.repository';
import { UserService } from './modules/user/20_application/user.service';
import { userRoutes } from './modules/user/10_presentation/user.route';
import { errorHandler } from './common/error.handler';

// fastifyのインスタンスを作成
const fastify = Fastify({ logger: true });

// repositoryのインスタンスを作成
const postRepository = new PostRepository();
const userRepository = new UserRepository();

// serviceのインスタンスを作成
const postService = new PostService(postRepository);
const userService = new UserService(userRepository);

// JWT プラグイン登録
fastify.register(jwt, { secret: 'jwtSecret' });

// エラーハンドラー登録
errorHandler(fastify);

// Routeの登録
fastify.register((app) => postRoutes(app, postService));
fastify.register((app) => userRoutes(app, userService));

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
