import { NotFoundError } from "#core/errors/notfound_error.js";
import { TeachersRepository } from "#core/repositories/teachers-repo.js";
import { IGetTeacherUseCase } from "#core/use-cases/teacher.js";

export class GetteacherUseCase implements IGetTeacherUseCase {
  constructor(private teachersRepo: TeachersRepository) {}
  async execute(teacherId: string) {
    const aTeacher = await this.teachersRepo.findById(teacherId);

    if (!aTeacher) {
      throw new NotFoundError("O Monitor não foi encotrado");
    }

    return aTeacher;
  }

  async byPersonId(personId: string) {
    const aTeacher = await this.teachersRepo.findByPersonId(personId);

    if (!aTeacher) {
      throw new NotFoundError("O Monitor não foi encotrado");
    }

    return aTeacher;
  }
}
