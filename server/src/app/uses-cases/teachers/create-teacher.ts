import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ICreateTeacherUseCase } from "#core/use-cases/teacher.js";
import { TeachersRepository } from "#core/repositories/teachers-repo.js";
import { CreateTeacherInputDto } from "#app/dtos/teachers-dto.js";
import { Teachers } from "#core/entities/teachers.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";

export class CreateTeacherUseCase implements ICreateTeacherUseCase {
  constructor(
    private teachersRepo: TeachersRepository,
    private peopleRepo: PeopleRepository
  ) {}

  async execute(input: CreateTeacherInputDto) {
    const existingPerson = await this.peopleRepo.findById(input.personId);

    if (!existingPerson) {
      throw new BusinessError("Não Existe cadastro prévio desse monitor");
    }

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
