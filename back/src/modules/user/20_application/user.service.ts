import { BadRequestError, UnauthorizedError } from '../../../common/errors';
import { User } from '../30_domain/user.entity';
import { UserRepository } from '../40_infrastructure/user.repository';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(email: string, password: string, name: string): Promise<User> {
    // エンティティ単体で見れないからここで確認
    // emailの重複チェック
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError('このメールアドレスは既に登録されています');
    }

    // ユーザー作成
    const user = new User(email, password, name);
    const hashedPassword = await bcrypt.hash(password, 10);
    user.setPassword(hashedPassword);
    return await this.userRepository.create(user);
  }
  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    // セキュリティ的に同じメッセージの方がよい
    if (!user) {
      throw new UnauthorizedError('認証に失敗しました');
    }

    const isPasswordValid = await bcrypt.compare(password, user.getPassword());
    if (!isPasswordValid) {
      throw new UnauthorizedError('認証に失敗しました');
    }

    return user;
  }
}
