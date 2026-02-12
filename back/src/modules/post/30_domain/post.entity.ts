// Domain Layer（ビジネスロジック・エンティティ）
// Postは何でどう振る舞うのか。性質。

export class Post {
  private id: number;
  private title: string;
  private content: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(title: string, content: string) {
    // ビジネスロジック
    if (!title) {
      throw new Error('タイトルがありません');
    }

    if (!content) {
      throw new Error('本文がありません');
    }

    // インスタンス変数の初期化
    this.id = 0; // 初期値
    this.title = title;
    this.content = content;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  change(title: string, content: string) {
    if (!title) {
      throw new Error('タイトルがありません');
    }

    if (!content) {
      throw new Error('本文がありません');
    }

    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }

  // セッター
  setId(id: number) {
    this.id = id;
  }

  // ゲッター
  getId(): number {
    return this.id;
  }
}
