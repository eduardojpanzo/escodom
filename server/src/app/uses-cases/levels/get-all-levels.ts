import { LevelsProps } from "#core/entities/levels.js";
import { LevelsRepository } from "#core/repositories/levels-repo.js";
import { IGetAllLevelsUseCase } from "#core/use-cases/level.js";

export class GetAllLevelsUseCase implements IGetAllLevelsUseCase {
  constructor(private levelsRepo: LevelsRepository) {}
  async execute(): Promise<LevelsProps[]> {
    const data = await this.levelsRepo.findAll();

    if (!data) {
      return [];
    }

    return data;
  }
}
