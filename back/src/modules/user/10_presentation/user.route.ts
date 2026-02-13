import { FastifyInstance } from 'fastify';
import { UserService } from '../20_application/user.service';
import { loginSchema, signupSchema } from './user.schema';

export async function userRoutes(app: FastifyInstance, userService: UserService) {
  app.post('/users/signup', { schema: signupSchema }, async (request, reply) => {
    const { email, password, name } = request.body as {
      email: string;
      password: string;
      name: string;
    };

    const user = await userService.register(email, password, name);
    const token = app.jwt.sign({ userId: user.getId() });

    reply.status(201).send({
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      token,
    });
  });

  app.post('/users/login', { schema: loginSchema }, async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    const user = await userService.login(email, password);
    const token = app.jwt.sign({ userId: user.getId() });

    reply.status(200).send({ token });
  });
}
