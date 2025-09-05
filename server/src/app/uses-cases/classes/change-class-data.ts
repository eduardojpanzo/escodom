import { ClassesProps } from "#core/entities/classes.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ClassesRepository } from "#core/repositories/classes-repo.js";
import { IChangeClassDataUseCase } from "#core/use-cases/class.js";

export class ChangeClassDataUseCase implements IChangeClassDataUseCase {
  constructor(private classesRepo: ClassesRepository) {}
  async execute(classId: string, data: Partial<ClassesProps>) {
    const existingClass = await this.classesRepo.findById(classId);

    if (
      !existingClass?.name ||
      !existingClass.levelId ||
      !existingClass.classId
    ) {
      throw new NotFoundError("A Classe não foi encotrado");
    }

    const aClass = await this.classesRepo.update(classId, {
      ...data,
    });

    if (!aClass?.classId) {
      throw new ServerError("Erro ao atualizar os dados da Classe");
    }

    return {
      classId: aClass.classId,
    };
  }
}
