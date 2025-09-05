import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { LevelsRepository } from "#core/repositories/levels-repo.js";
import { IDeleteLevelUseCase } from "#core/use-cases/level.js";

export class DeleteLevelUseCase implements IDeleteLevelUseCase {
  constructor(private levelsRepo: LevelsRepository) {}
  async execute(levelId: string) {
    const existingLevel = await this.levelsRepo.findById(levelId);

    if (!existingLevel?.levelId || !existingLevel.name) {
      throw new NotFoundError("O Nivel não foi encotrado");
    }

    const aLevel = await this.levelsRepo.delete(levelId);

    if (!aLevel?.levelId) {
      throw new ServerError("Erro ao Eliminar o Nivel");
    }

    return {
      levelId: aLevel.levelId,
    };
  }
}
