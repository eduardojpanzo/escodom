import { NotFoundError } from "#core/errors/notfound_error.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
import { IGetStudentUseCase } from "#core/use-cases/stundet.js";

export class GetStudentUseCase implements IGetStudentUseCase {
  constructor(private studentsRepo: StudentsRepository) {}
  async execute(studentId: string) {
    const aStudent = await this.studentsRepo.findById(studentId);

    if (!aStudent) {
      throw new NotFoundError("O Estudante não foi encotrado");
    }

    return aStudent;
  }
}
