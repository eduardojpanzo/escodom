import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
import { IDeleteStudentUseCase } from "#core/use-cases/stundet.js";

export class DeleteStudentUseCase implements IDeleteStudentUseCase {
  constructor(private studentsRepo: StudentsRepository) {}
  async execute(studentId: string) {
    const existingStudent = await this.studentsRepo.findById(studentId);

    if (
      !existingStudent?.accessKey ||
      !existingStudent.studentId ||
      !existingStudent.personId
    ) {
      throw new NotFoundError("O Estudante não foi encotrado");
    }

    const aStudent = await this.studentsRepo.delete(studentId);

    if (!aStudent?.studentId) {
      throw new ServerError("Erro ao Eliminar o Estudante");
    }

    return {
      studentId: aStudent.studentId,
    };
  }
}
