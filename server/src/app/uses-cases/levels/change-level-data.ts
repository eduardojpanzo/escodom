import { LevelsProps } from "#core/entities/levels.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { LevelsRepository } from "#core/repositories/levels-repo.js";
import { IChangeLevelDataUseCase } from "#core/use-cases/level.js";

export class ChangeLevelDataUseCase implements IChangeLevelDataUseCase {
  constructor(private levelsRepo: LevelsRepository) {}
  async execute(levelId: string, data: Partial<LevelsProps>) {
    const existingLevel = await this.levelsRepo.findById(levelId);

    if (!existingLevel?.name || !existingLevel.levelId) {
      throw new NotFoundError("O Nivel não foi encotrado");
    }

    const aLevel = await this.levelsRepo.update(levelId, {
      ...data,
    });

    if (!aLevel?.levelId) {
      throw new ServerError("Erro ao atualizar os dados da Nivel");
    }

    return {
      levelId: aLevel.levelId,
    };
  }
}
