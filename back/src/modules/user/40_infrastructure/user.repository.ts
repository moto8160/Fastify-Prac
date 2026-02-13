import { User } from '../30_domain/user.entity';

export class UserRepository {
  // メモリ上でユーザーを保存
  private users: User[] = [];
  private nextId: number = 1;

  async create(user: User): Promise<User> {
    user.setId(this.nextId++);
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.getEmail() === email);
    return user || null;
  }

  async findById(id: number): Promise<User | null> {
    const user = this.users.find((u) => u.getId() === id);
    return user || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
