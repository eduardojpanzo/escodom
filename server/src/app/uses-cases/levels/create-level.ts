import { CreateLevelInputDto } from "#app/dtos/levels-dto.js";
import { Levels } from "#core/entities/levels.js";
import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { LevelsRepository } from "#core/repositories/levels-repo.js";
import { ICreateLevelUseCase } from "#core/use-cases/level.js";

export class CreateLevelUseCase implements ICreateLevelUseCase {
  constructor(private levelsRepo: LevelsRepository) {}

  async execute(input: CreateLevelInputDto) {
    const existingLevel = await this.levelsRepo.findByName(input.name);

    if (existingLevel) {
      throw new BusinessError("O Nivel Pretendido já existe!");
    }

    const newLevel = Levels.create({
      ...input,
    });

    const aLevel = await this.levelsRepo.save(newLevel.props);

    if (!aLevel?.levelId) {
      throw new ServerError("Erro ao criar o Nivel");
    }

    return { levelId: aLevel.levelId };
  }
}
