import { NotFoundError } from "#core/errors/notfound_error.js";
import { ClassesRepository } from "#core/repositories/classes-repo.js";
import { IGetClassUseCase } from "#core/use-cases/class.js";

export class GetClassUseCase implements IGetClassUseCase {
  constructor(private classesRepo: ClassesRepository) {}
  async execute(classId: string) {
    const aClass = await this.classesRepo.findById(classId);

    if (!aClass) {
      throw new NotFoundError("A Classe não foi encotrado");
    }

    return aClass;
  }
}
