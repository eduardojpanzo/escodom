import { StudentsProps } from "#core/entities/students.js";

export interface StudentsRepository {
  save(student: StudentsProps): Promise<StudentsProps | null>;
  findAll(): Promise<StudentsProps[] | null>;
  findByPersonId(personId: string): Promise<StudentsProps | null>;
  findById(id: string): Promise<StudentsProps | null>;
  findByAccessKey(accessKey: string): Promise<StudentsProps | null>;
  update(
    id: string,
    student: Partial<StudentsProps>
  ): Promise<StudentsProps | null>;
  delete(id: string): Promise<StudentsProps | null>;
}
