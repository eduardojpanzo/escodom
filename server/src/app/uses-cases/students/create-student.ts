import { CreateStudentInputDto } from "#app/dtos/students-dto.js";
import { Students } from "#core/entities/students.js";
import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
import { ICreateStudentUseCase } from "#core/use-cases/stundet.js";

export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(private studentsRepo: StudentsRepository) {}

  async execute(input: CreateStudentInputDto) {
    const existingStudent = await this.studentsRepo.findByPersonId(
      input.personId
    );

    if (existingStudent) {
      throw new BusinessError("O Estudante Pretendido já existe!");
    }

    const newStudent = Students.create({
      ...input,
    });

    const aStudent = await this.studentsRepo.save(newStudent.props);

    if (!aStudent?.studentId) {
      throw new ServerError("Erro ao criar o Estudante");
    }

    return { studentId: aStudent.studentId };
  }
}
