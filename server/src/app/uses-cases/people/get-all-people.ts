import {
  paginate,
  PaginatedResult,
  PaginationParams,
} from "#core/common/pagination.js";
import { PeopleProps } from "#core/entities/people.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { IGetAllPeopleUseCase } from "#core/use-cases/people.js";

export class GetAllPeopleUseCase implements IGetAllPeopleUseCase {
  constructor(private PeopleRepo: PeopleRepository) {}
  async execute(
    filters: PaginationParams
  ): Promise<PaginatedResult<PeopleProps>> {
    const { data, totalCount } = await this.PeopleRepo.findAll(filters);

    if (!data.length) {
      return paginate([], 0, filters.pageNumber, filters.pageSize);
    }

    return paginate(data, totalCount, filters.pageNumber, filters.pageSize);
  }
}
