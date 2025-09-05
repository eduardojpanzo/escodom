import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ICreateTeacherUseCase } from "#core/use-cases/teacher.js";
import { TeachersRepository } from "#core/repositories/teachers-repo.js";
import { CreateTeacherInputDto } from "#app/dtos/teachers-dto.js";
import { Teachers } from "#core/entities/teachers.js";

export class CreateTeacherUseCase implements ICreateTeacherUseCase {
  constructor(private teachersRepo: TeachersRepository) {}

  async execute(input: CreateTeacherInputDto) {
    const existingTeacher = await this.teachersRepo.findByPersonId(
      input.personId
    );

    if (existingTeacher) {
      throw new BusinessError("O monitor Pretendido já existe!");
    }

    const newTeacher = Teachers.create({
      ...input,
    });

    const aTeacher = await this.teachersRepo.save(newTeacher.props);

    if (!aTeacher?.teacherId) {
      throw new ServerError("Erro ao criar o Monitor");
    }

    return { teacherId: aTeacher.teacherId };
  }
}
