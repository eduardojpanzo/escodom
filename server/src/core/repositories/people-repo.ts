import { PeopleProps } from "#core/entities/people.js";

export interface PeopleRepository {
  save(person: PeopleProps): Promise<PeopleProps | null>;
  findByBi(bi: string): Promise<PeopleProps | null>;
  findById(id: string): Promise<PeopleProps | null>;
  update(id: string, user: Partial<PeopleProps>): Promise<PeopleProps | null>;
  delete(id: string): Promise<PeopleProps | null>;
}
