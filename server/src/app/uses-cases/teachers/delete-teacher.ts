import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { TeachersRepository } from "#core/repositories/teachers-repo.js";
import { IDeleteTeacherUseCase } from "#core/use-cases/teacher.js";

export class DeleteTeacherUseCase implements IDeleteTeacherUseCase {
  constructor(private teachersRepo: TeachersRepository) {}
  async execute(teacherId: string) {
    const existingTeacher = await this.teachersRepo.findById(teacherId);

    if (
      !existingTeacher?.position ||
      !existingTeacher.teacherId ||
      !existingTeacher.personId
    ) {
      throw new NotFoundError("O Monitor não foi encotrado");
    }

    const aTeacher = await this.teachersRepo.delete(teacherId);

    if (!aTeacher?.teacherId) {
      throw new ServerError("Erro ao Eliminar o Monitor");
    }

    return {
      teacherId: aTeacher.teacherId,
    };
  }
}
