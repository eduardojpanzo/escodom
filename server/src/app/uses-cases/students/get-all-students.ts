import { paginate, PaginatedResult } from "#core/common/pagination.js";
import { StudentsProps } from "#core/entities/students.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
import {
  IGetAllStudentsUseCase,
  StudentFilterParams,
} from "#core/use-cases/stundet.js";

export class GetAllStudentsUseCase implements IGetAllStudentsUseCase {
  constructor(private StudentsRepo: StudentsRepository) {}
  async execute(
    filters: StudentFilterParams
  ): Promise<PaginatedResult<StudentsProps>> {
    const { data, totalCount } = await this.StudentsRepo.findAll(filters);

    if (!data.length) {
      return paginate([], 0, filters.pageNumber, filters.pageSize);
    }

    return paginate(data, totalCount, filters.pageNumber, filters.pageSize);
  }
}
