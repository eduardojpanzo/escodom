import { UsersProps } from "#core/entities/users.js";

export interface UsersRepository {
  save(user: UsersProps): Promise<Omit<UsersProps, "password"> | null>;
  findByEmail(email: string): Promise<Omit<UsersProps, "password"> | null>;
  findById(id: string): Promise<Omit<UsersProps, "password"> | null>;
  update(
    id: string,
    user: Partial<UsersProps>
  ): Promise<Omit<UsersProps, "password"> | null>;
  delete(id: string): Promise<Omit<UsersProps, "password"> | null>;
}
