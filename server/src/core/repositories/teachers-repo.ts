import { TeachersProps } from "#core/entities/teachers.js";
import { TeacherFilterParams } from "#core/use-cases/teacher.js";

export interface TeachersRepository {
  save(teacher: TeachersProps): Promise<TeachersProps | null>;
  findAll(
    filters: TeacherFilterParams
  ): Promise<{ data: TeachersProps[]; totalCount: number }>;
  findByPersonId(personId: string): Promise<TeachersProps | null>;
  findById(id: string): Promise<TeachersProps | null>;
  update(
    id: string,
    teacher: Partial<TeachersProps>
  ): Promise<TeachersProps | null>;
  delete(id: string): Promise<TeachersProps | null>;
}
