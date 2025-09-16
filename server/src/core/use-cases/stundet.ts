import { PaginatedResult, PaginationParams } from "#core/common/pagination.js";
import { StudentsProps } from "#core/entities/students.js";

export interface StudentFilterParams extends PaginationParams {
  name?: string;
  classId?: string;
  levelId?: string;
}
export interface ICreateStudentUseCase {
  execute(
    data: Pick<StudentsProps, "classId" | "personId">
  ): Promise<{ studentId: string }>;
}

export interface IGetAllStudentsUseCase {
  execute(
    filters: StudentFilterParams
  ): Promise<PaginatedResult<StudentsProps>>;
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
