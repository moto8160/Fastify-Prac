import { FastifyInstance } from 'fastify';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  PaymentRequiredError,
  UnauthorizedError,
} from './errors';

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof BadRequestError) {
      return reply.status(400).send({ message: error.message });
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({ message: error.message });
    }

    if (error instanceof PaymentRequiredError) {
      return reply.status(402).send({ message: error.message });
    }

    if (error instanceof ForbiddenError) {
      return reply.status(403).send({ message: error.message });
    }
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    console.error(error);

    return reply.status(500).send({
      message: 'Internal Server Error',
    });
  });
}
