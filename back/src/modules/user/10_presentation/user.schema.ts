export const signupSchema = {
  body: {
    type: 'object',
    required: ['email', 'password', 'name'],
    properties: {
      // email: { type: 'string', format: 'email' },
      email: { type: 'string' },
      password: { type: 'string', minLength: 4 },
      name: { type: 'string', minLength: 1 },
    },
  },
};

export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      // email: { type: 'string', format: 'email' },
      email: { type: 'string' },
      password: { type: 'string', minLength: 4 },
    },
  },
};

export const signupResponseSchema = {
  200: {
    description: 'ユーザー登録成功',
    type: 'object',
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      name: { type: 'string' },
      createdAt: { type: 'string' },
    },
  },
};
