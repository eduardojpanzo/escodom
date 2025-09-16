import { PaginatedResult, PaginationParams } from "#core/common/pagination.js";
import { ClassesProps } from "#core/entities/classes.js";

export interface ClassFilterParams extends PaginationParams {
  levelId?: string;
  name?: string;
}

export interface ICreateClassUseCase {
  execute(
    data: Pick<ClassesProps, "name" | "description" | "levelId">
  ): Promise<{ classId: string }>;
}

export interface IGetAllClassesUseCase {
  execute(filters: ClassFilterParams): Promise<PaginatedResult<ClassesProps>>;
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
