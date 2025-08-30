import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ClassesRepository } from "#core/repositories/classes-repo.js";
import { IDeleteClassUseCase } from "#core/use-cases/class.js";

export class DeleteClassUseCase implements IDeleteClassUseCase {
  constructor(private classesRepo: ClassesRepository) {}
  async execute(classId: string) {
    const existingClass = await this.classesRepo.findById(classId);

    if (
      !existingClass?.classId ||
      !existingClass.levelId ||
      !existingClass.name
    ) {
      throw new NotFoundError("A classe não foi encotrado");
    }

    const aClass = await this.classesRepo.delete(classId);

    if (!aClass?.classId) {
      throw new ServerError("Erro ao Eliminar A classe");
    }

    return {
      classId: aClass.classId,
    };
  }
}
