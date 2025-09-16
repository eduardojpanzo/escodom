import { ClassesProps } from "#core/entities/classes.js";

export interface ICreateClassUseCase {
  execute(
    data: Pick<ClassesProps, "name" | "description" | "levelId">
  ): Promise<{ classId: string }>;
}

export interface IGetAllClassesUseCase {
  execute(): Promise<ClassesProps[]>;
}

export interface IGetClassUseCase {
  execute(classId: string): Promise<ClassesProps>;
}

export interface IDeleteClassUseCase {
  execute(classId: string): Promise<{ classId: string }>;
}

export interface IChangeClassDataUseCase {
  execute(
    classId: string,
    data: Partial<ClassesProps>
  ): Promise<{ classId: string }>;
}
