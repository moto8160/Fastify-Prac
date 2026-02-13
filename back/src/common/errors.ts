// 基底クラス
export class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}

// 400 Bad Request
export class BadRequestError extends AppError {}

// 401 Unauthorized
export class UnauthorizedError extends AppError {}

// 402 Payment Required
export class PaymentRequiredError extends AppError {}

// 403 Forbidden
export class ForbiddenError extends AppError {}

// 404 Not Found
export class NotFoundError extends AppError {}
