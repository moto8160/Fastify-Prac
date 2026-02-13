// 入力バリデーション

export const createPostSchema = {
  body: {
    type: 'object',
    required: ['title', 'content'], //入力必須チェック
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
    required: ['title', 'content'],
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
