import { TeachersProps } from "#core/entities/teachers.js";

export interface ICreateTeacherUseCase {
  execute(
    data: Pick<TeachersProps, "position" | "trainingYear" | "personId">
  ): Promise<{ teacherId: string }>;
}

export interface IGetTeacherUseCase {
  execute(teacherId: string): Promise<TeachersProps>;
}

export interface IDeleteTeacherUseCase {
  execute(teacherId: string): Promise<{ teacherId: string }>;
}

export interface IChangeTeacherDataUseCase {
  execute(
    teacherId: string,
    data: Partial<TeachersProps>
  ): Promise<{ teacherId: string }>;
}
