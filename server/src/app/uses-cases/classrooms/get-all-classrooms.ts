import { paginate, PaginatedResult } from "#core/common/pagination.js";
import { ClassroomsProps } from "#core/entities/classrooms.js";
import { ClassroomsRepository } from "#core/repositories/classrooms-repo.js";
import {
  ClassroomFilterParams,
  IGetAllClassroomsUseCase,
} from "#core/use-cases/classroom.js";

export class GetAllClassroomsUseCase implements IGetAllClassroomsUseCase {
  constructor(private classroomsRepo: ClassroomsRepository) {}
  async execute(
    filters: ClassroomFilterParams
  ): Promise<PaginatedResult<ClassroomsProps>> {
    const { data, totalCount } = await this.classroomsRepo.findAll(filters);

    if (!data.length) {
      return paginate([], 0, filters.pageNumber, filters.pageSize);
    }

    return paginate(data, totalCount, filters.pageNumber, filters.pageSize);
  }
}
