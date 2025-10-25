import { ClassroomsProps } from "#core/entities/classrooms.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ClassroomsRepository } from "#core/repositories/classrooms-repo.js";
import { IChangeClassroomDataUseCase } from "#core/use-cases/classroom.js";

export class ChangeClassroomDataUseCase implements IChangeClassroomDataUseCase {
  constructor(private classroomsRepo: ClassroomsRepository) {}
  async execute(classroomId: string, data: Partial<ClassroomsProps>) {
    const existingClassroom = await this.classroomsRepo.findById(classroomId);

    if (
      !existingClassroom?.name ||
      !existingClassroom.classId ||
      !existingClassroom.classroomId
    ) {
      throw new NotFoundError("A Sala de aula não foi encotrado");
    }

    const aClassroom = await this.classroomsRepo.update(classroomId, {
      ...data,
    });

    if (!aClassroom?.classroomId) {
      throw new ServerError("Erro ao atualizar os dados da Sala de aula");
    }

    return {
      classroomId: aClassroom.classroomId,
    };
  }
}
