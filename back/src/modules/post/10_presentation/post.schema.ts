// 入力バリデーション

export const createPostSchema = {
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
      },
      content: {
        type: 'string',
        minLength: 1,
        maxLength: 1000,
      },
    },
  },
};

export const updatePostSchema = {
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
      },
      content: {
        type: 'string',
        minLength: 1,
        maxLength: 1000,
      },
    },
  },
};