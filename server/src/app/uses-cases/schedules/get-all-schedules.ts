import { paginate, PaginatedResult } from "#core/common/pagination.js";
import { SchedulesProps } from "#core/entities/schedules.js";
import { SchedulesRepository } from "#core/repositories/schedules-repo.js";
import {
  IGetAllSchedulesUseCase,
  ScheduleFilterParams,
} from "#core/use-cases/schedules.js";

export class GetAllSchedulesUseCase implements IGetAllSchedulesUseCase {
  constructor(private schedulesRepo: SchedulesRepository) {}
  async execute(
    filters: ScheduleFilterParams
  ): Promise<PaginatedResult<SchedulesProps>> {
    const { data, totalCount } = await this.schedulesRepo.findAll(filters);

    if (!data.length) {
      return paginate([], 0, filters.pageNumber, filters.pageSize);
    }

    return paginate(data, totalCount, filters.pageNumber, filters.pageSize);
  }
}
