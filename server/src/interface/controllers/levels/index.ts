import { ChangeLevelDataUseCase } from "#app/uses-cases/levels/change-level-data.js";
import { CreateLevelUseCase } from "#app/uses-cases/levels/create-level.js";
import { DeleteLevelUseCase } from "#app/uses-cases/levels/delete-level.js";
import { GetLevelUseCase } from "#app/uses-cases/levels/get-level.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaLevelsRepository } from "#infra/repositories/prisma-levels-repo.js";
import { LevelsController } from "./level-controller.js";

const LevelsRepo = PrismaLevelsRepository.build(prisma);

const createLevelUseCase = new CreateLevelUseCase(LevelsRepo);
const getLevelUseCase = new GetLevelUseCase(LevelsRepo);
const changeLevelDataUseCase = new ChangeLevelDataUseCase(LevelsRepo);
const deleteLevelDataUseCase = new DeleteLevelUseCase(LevelsRepo);

const levelsController = new LevelsController(
  createLevelUseCase,
  getLevelUseCase,
  changeLevelDataUseCase,
  deleteLevelDataUseCase
);

export { levelsController };
