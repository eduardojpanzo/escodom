import { Users } from "#core/entities/users.js";

export interface UsersRepository {
  save(user: Users): Promise<void>;
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  update(id: string, user: Partial<Users>): Promise<Users | null>;
}
