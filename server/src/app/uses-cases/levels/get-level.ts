import { NotFoundError } from "#core/errors/notfound_error.js";
import { LevelsRepository } from "#core/repositories/levels-repo.js";
import { IGetLevelUseCase } from "#core/use-cases/level.js";

export class GetLevelUseCase implements IGetLevelUseCase {
  constructor(private levelsRepo: LevelsRepository) {}
  async execute(levelId: string) {
    const aLevel = await this.levelsRepo.findById(levelId);

    if (!aLevel) {
      throw new NotFoundError("O Nivel não foi encotrado");
    }

    return aLevel;
  }
}
