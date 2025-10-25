import { NotFoundError } from "#core/errors/notfound_error.js";
import { ClassroomsRepository } from "#core/repositories/classrooms-repo.js";
import { IGetClassroomUseCase } from "#core/use-cases/classroom.js";

export class GetClassroomUseCase implements IGetClassroomUseCase {
  constructor(private classroomsRepo: ClassroomsRepository) {}
  async execute(classroomId: string) {
    const aClassroom = await this.classroomsRepo.findById(classroomId);

    if (!aClassroom) {
      throw new NotFoundError("A Sala de aula não foi encotrado");
    }

    return aClassroom;
  }
}
