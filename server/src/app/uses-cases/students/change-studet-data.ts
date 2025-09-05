import { StudentsProps } from "#core/entities/students.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
import { IChangeStudentDataUseCase } from "#core/use-cases/stundet.js";

export class ChangeStudentDataUseCase implements IChangeStudentDataUseCase {
  constructor(private studentsRepo: StudentsRepository) {}
  async execute(studentId: string, data: Partial<StudentsProps>) {
    const existingStudent = await this.studentsRepo.findById(studentId);

    if (
      !existingStudent?.accessKey ||
      !existingStudent.personId ||
      !existingStudent.studentId
    ) {
      throw new NotFoundError("O Estudante não foi encotrado");
    }

    const aStudent = await this.studentsRepo.update(existingStudent.studentId, {
      ...data,
    });

    if (!aStudent?.studentId) {
      throw new ServerError("Erro ao atualizar os dados do Estudante");
    }

    return {
      studentId: aStudent.studentId,
    };
  }
}
