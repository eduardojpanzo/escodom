import { CreateClassRoomInputDto } from "#app/dtos/classrooms-dto.js";
import { Classrooms } from "#core/entities/classrooms.js";
import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ClassroomsRepository } from "#core/repositories/classrooms-repo.js";
import { ICreateClassroomUseCase } from "#core/use-cases/classroom.js";

export class CreateClassroomUseCase implements ICreateClassroomUseCase {
  constructor(private classroomsRepo: ClassroomsRepository) {}

  async execute(input: CreateClassRoomInputDto) {
    const existingClassroom = await this.classroomsRepo.findByName(input.name);

    if (existingClassroom) {
      throw new BusinessError("A Sala de aula Pretendido já existe!");
    }

    const newClassroom = Classrooms.create({
      ...input,
    });

    const aClassroom = await this.classroomsRepo.save(newClassroom.props);

    if (!aClassroom?.classroomId) {
      throw new ServerError("Erro ao criar a sala de aula");
    }

    return { classroomId: aClassroom.classroomId };
  }
}
