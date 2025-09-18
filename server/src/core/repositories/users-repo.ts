import { UsersProps } from "#core/entities/users.js";
import { UserFilterParams } from "#core/use-cases/users.js";

export interface UsersRepository {
  save(user: UsersProps): Promise<UsersProps | null>;
  findAll(
    filters: UserFilterParams
  ): Promise<{ data: UsersProps[]; totalCount: number }>;
  findByEmail(email: string): Promise<UsersProps | null>;
  findById(id: string): Promise<UsersProps | null>;
  findByPersonId(personId: string): Promise<UsersProps | null>;
  update(id: string, user: Partial<UsersProps>): Promise<UsersProps | null>;
  delete(id: string): Promise<UsersProps | null>;
  count(): Promise<number | null>;
}
