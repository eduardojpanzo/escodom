import {
  paginate,
  PaginatedResult,
  PaginationParams,
} from "#core/common/pagination.js";
import { ClassesProps } from "#core/entities/classes.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ClassesRepository } from "#core/repositories/classes-repo.js";
import {
  ClassFilterParams,
  IGetAllClassesUseCase,
} from "#core/use-cases/class.js";

export class GetAllClassesUseCase implements IGetAllClassesUseCase {
  constructor(private classesRepo: ClassesRepository) {}
  async execute(
    filters: ClassFilterParams
  ): Promise<PaginatedResult<ClassesProps>> {
    const { data, totalCount } = await this.classesRepo.findAll(filters);

    if (!data.length) {
      throw new NotFoundError("Nenhum usuário foi encontrado");
    }

    return paginate(data, totalCount, filters.pageNumber, filters.pageSize);
  }
}
