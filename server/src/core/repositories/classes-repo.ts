import { ClassesProps } from "#core/entities/classes.js";

export interface ClassesRepository {
  save(classId: ClassesProps): Promise<ClassesProps | null>;
  findByLevel(levelId: string): Promise<ClassesProps[] | null>;
  findById(id: string): Promise<ClassesProps | null>;
  findByName(name: string): Promise<ClassesProps | null>;
  update(
    id: string,
    classId: Partial<ClassesProps>
  ): Promise<ClassesProps | null>;
  delete(id: string): Promise<ClassesProps | null>;
}
