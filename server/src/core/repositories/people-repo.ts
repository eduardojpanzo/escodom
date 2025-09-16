import { PaginationParams } from "#core/common/pagination.js";
import { PeopleProps } from "#core/entities/people.js";

export interface PeopleRepository {
  save(person: PeopleProps): Promise<PeopleProps | null>;
  findAll(
    filters: PaginationParams
  ): Promise<{ data: PeopleProps[]; totalCount: number }>;
  findByPersonalCode(personalCode: string): Promise<PeopleProps | null>;
  findById(id: string): Promise<PeopleProps | null>;
  update(id: string, person: Partial<PeopleProps>): Promise<PeopleProps | null>;
  delete(id: string): Promise<PeopleProps | null>;
  count(): Promise<number | null>;
  findLastCreated(): Promise<PeopleProps | null>;
}
