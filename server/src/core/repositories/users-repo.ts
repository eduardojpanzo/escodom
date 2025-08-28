import { UsersProps } from "#core/entities/users.js";

export interface UsersRepository {
  save(user: UsersProps): Promise<UsersProps | null>;
  findByEmail(email: string): Promise<UsersProps | null>;
  findById(id: string): Promise<UsersProps | null>;
  update(id: string, user: Partial<UsersProps>): Promise<UsersProps | null>;
  delete(id: string): Promise<UsersProps | null>;
}
