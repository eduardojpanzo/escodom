import { LevelsProps } from "#core/entities/levels.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { LevelsRepository } from "#core/repositories/levels-repo.js";
import { IGetAllLevelsUseCase } from "#core/use-cases/level.js";

export class GetAllLevelsUseCase implements IGetAllLevelsUseCase {
  constructor(private levelsRepo: LevelsRepository) {}
  async execute(): Promise<LevelsProps[]> {
    const data = await this.levelsRepo.findAll();

    if (!data) {
      throw new NotFoundError("Nenhum usuário foi encontrado");
    }

    return data;
  }
}
