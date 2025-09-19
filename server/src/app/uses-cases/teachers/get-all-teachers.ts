import { paginate, PaginatedResult } from "#core/common/pagination.js";
import { TeachersProps } from "#core/entities/teachers.js";
import { TeachersRepository } from "#core/repositories/teachers-repo.js";
import {
  IGetAllTeachersUseCase,
  TeacherFilterParams,
} from "#core/use-cases/teacher.js";

export class GetAllTeachersUseCase implements IGetAllTeachersUseCase {
  constructor(private TeachersRepo: TeachersRepository) {}
  async execute(
    filters: TeacherFilterParams
  ): Promise<PaginatedResult<TeachersProps>> {
    const { data, totalCount } = await this.TeachersRepo.findAll(filters);

    if (!data.length) {
      return paginate([], 0, filters.pageNumber, filters.pageSize);
    }

    return paginate(data, totalCount, filters.pageNumber, filters.pageSize);
  }
}
