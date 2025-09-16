import {
  paginate,
  PaginatedResult,
  PaginationParams,
} from "#core/common/pagination.js";
import { PeopleProps } from "#core/entities/people.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { IGetAllPeopleUseCase } from "#core/use-cases/people.js";

export class GetAllPeopleUseCase implements IGetAllPeopleUseCase {
  constructor(private PeopleRepo: PeopleRepository) {}
  async execute(
    filters: PaginationParams
  ): Promise<PaginatedResult<PeopleProps>> {
    const { data, totalCount } = await this.PeopleRepo.findAll(filters);

    if (!data.length) {
      throw new NotFoundError("Nenhum usuário foi encontrado");
    }

    return paginate(data, totalCount, filters.pageNumber, filters.pageSize);
  }
}
