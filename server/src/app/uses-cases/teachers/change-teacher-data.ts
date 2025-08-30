import { TeachersProps } from "#core/entities/teachers.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { TeachersRepository } from "#core/repositories/teachers-repo.js";
import { IChangeTeacherDataUseCase } from "#core/use-cases/teacher.js";

export class ChangeTeacherDataUseCase implements IChangeTeacherDataUseCase {
  constructor(private TeachersRepo: TeachersRepository) {}
  async execute(teacherId: string, data: Partial<TeachersProps>) {
    const existingTeacher = await this.TeachersRepo.findById(teacherId);

    if (
      !existingTeacher?.position ||
      !existingTeacher.personId ||
      !existingTeacher.teacherId
    ) {
      throw new NotFoundError("O Monitor não foi encotrado");
    }

    const aTeacher = await this.TeachersRepo.update(teacherId, {
      ...data,
    });

    if (!aTeacher?.teacherId) {
      throw new ServerError("Erro ao atualizar os dados do Monitor");
    }

    return {
      teacherId: aTeacher.teacherId,
    };
  }
}
