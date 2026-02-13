export class User {
  private id: number;
  private email: string;
  private password: string;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(email: string, password: string, name: string) {
    // スキーマでバリデーション済みなのでここでは省略

    this.id = 0; // 初期値
    this.email = email;
    this.password = password;
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // セッター
  setId(id: number) {
    this.id = id;
  }

  setPassword(password: string) {
    this.password = password;
  }

  // ゲッター
  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
