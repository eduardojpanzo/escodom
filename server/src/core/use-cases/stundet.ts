import { StudentsProps } from "#core/entities/students.js";

export interface ICreateStudentUseCase {
  execute(
    data: Pick<
      StudentsProps,
      "accessKey" | "birthDate" | "classId" | "personId"
    >
  ): Promise<{ studentId: string }>;
}

export interface IGetStudentUseCase {
  execute(studentId: string): Promise<StudentsProps>;
}

export interface IGetStudentByKeyUseCase {
  execute(accessKey: string): Promise<StudentsProps>;
}

export interface IDeleteStudentUseCase {
  execute(studentId: string): Promise<{ studentId: string }>;
}

export interface IChangeStudentDataUseCase {
  execute(
    studentId: string,
    data: Partial<StudentsProps>
  ): Promise<{ studentId: string }>;
}
