import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ClassroomsRepository } from "#core/repositories/classrooms-repo.js";
import { IDeleteClassroomUseCase } from "#core/use-cases/classroom.js";

export class DeleteClassroomUseCase implements IDeleteClassroomUseCase {
  constructor(private classroomsRepo: ClassroomsRepository) {}
  async execute(classroomId: string) {
    const existingClassroom = await this.classroomsRepo.findById(classroomId);

    if (
      !existingClassroom?.classroomId ||
      !existingClassroom.classId ||
      !existingClassroom.name
    ) {
      throw new NotFoundError("A sala de aula não foi encotrado");
    }

    const aClassroom = await this.classroomsRepo.delete(classroomId);

    if (!aClassroom?.classroomId) {
      throw new ServerError("Erro ao Eliminar A sala de aula");
    }

    return {
      classroomId: aClassroom.classroomId,
    };
  }
}
