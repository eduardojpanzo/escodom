import { PaginatedResult, PaginationParams } from "#core/common/pagination.js";
import { ClassroomsProps } from "#core/entities/classrooms.js";

export interface ClassroomFilterParams extends PaginationParams {
  classId?: string;
  levelId?: string;
  name?: string;
}

export interface ICreateClassroomUseCase {
  execute(
    data: Pick<ClassroomsProps, "name" | "description" | "classId">
  ): Promise<{ classroomId: string }>;
}

export interface IGetAllClassroomsUseCase {
  execute(
    filters: ClassroomFilterParams
  ): Promise<PaginatedResult<ClassroomsProps>>;
}

export interface IGetClassroomUseCase {
  execute(classroomId: string): Promise<ClassroomsProps>;
}

export interface IDeleteClassroomUseCase {
  execute(classroomId: string): Promise<{ classroomId: string }>;
}

export interface IChangeClassroomDataUseCase {
  execute(
    classroomId: string,
    data: Partial<ClassroomsProps>
  ): Promise<{ classroomId: string }>;
}
