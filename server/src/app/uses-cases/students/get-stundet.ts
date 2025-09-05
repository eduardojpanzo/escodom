import { NotFoundError } from "#core/errors/notfound_error.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
import {
  IGetStudentByKeyUseCase,
  IGetStudentUseCase,
} from "#core/use-cases/stundet.js";

export class GetStudentUseCase implements IGetStudentUseCase {
  constructor(private studentsRepo: StudentsRepository) {}
  async execute(studentId: string) {
    const aStudent = await this.studentsRepo.findById(studentId);

    if (!aStudent) {
      throw new NotFoundError("O Estudante não foi encotrado");
    }

    return aStudent;
  }

  async byPersonId(personId: string) {
    const aStudent = await this.studentsRepo.findByPersonId(personId);

    if (!aStudent) {
      throw new NotFoundError("O Estudante não foi encotrado");
    }

    return aStudent;
  }
}

export class GetStudentByKeyUseCase implements IGetStudentByKeyUseCase {
  constructor(private studentsRepo: StudentsRepository) {}
  async execute(acessKey: string) {
    const aStudent = await this.studentsRepo.findByAccessKey(acessKey);

    if (!aStudent) {
      throw new NotFoundError("O Estudante não foi encotrado");
    }

    return aStudent;
  }

  async byPersonId(personId: string) {
    const aStudent = await this.studentsRepo.findByPersonId(personId);

    if (!aStudent) {
      throw new NotFoundError("O Estudante não foi encotrado");
    }

    return aStudent;
  }
}
