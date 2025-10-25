import { ClassroomsProps } from "#core/entities/classrooms.js";
import { ClassFilterParams } from "#core/use-cases/class.js";

export interface ClassroomsRepository {
  save(classroomId: ClassroomsProps): Promise<ClassroomsProps | null>;
  findAll(
    filters: ClassFilterParams
  ): Promise<{ data: ClassroomsProps[]; totalCount: number }>;
  findByClass(classId: string): Promise<ClassroomsProps[] | null>;
  findById(id: string): Promise<ClassroomsProps | null>;
  findByName(name: string): Promise<ClassroomsProps | null>;
  update(
    id: string,
    classroomId: Partial<ClassroomsProps>
  ): Promise<ClassroomsProps | null>;
  delete(id: string): Promise<ClassroomsProps | null>;
}
