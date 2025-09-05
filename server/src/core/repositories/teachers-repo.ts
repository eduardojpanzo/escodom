import { TeachersProps } from "#core/entities/teachers.js";

export interface TeachersRepository {
  save(teacher: TeachersProps): Promise<TeachersProps | null>;
  findByPersonId(personId: string): Promise<TeachersProps | null>;
  findById(id: string): Promise<TeachersProps | null>;
  update(
    id: string,
    teacher: Partial<TeachersProps>
  ): Promise<TeachersProps | null>;
  delete(id: string): Promise<TeachersProps | null>;
}
