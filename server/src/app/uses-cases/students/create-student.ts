import { CreateStudentInputDto } from "#app/dtos/students-dto.js";
import { Students } from "#core/entities/students.js";
import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
import { CodeGeneratorService } from "#core/services/code-generator.js";
import { ICreateStudentUseCase } from "#core/use-cases/stundet.js";

export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(
    private studentsRepo: StudentsRepository,
    private peopleRepo: PeopleRepository,
    private codeGenerator: CodeGeneratorService
  ) {}

  async execute(input: CreateStudentInputDto) {
    const existingPerson = await this.peopleRepo.findById(input.personId);

    if (!existingPerson) {
      throw new BusinessError("Não Existe cadastro prévio desse estudante");
    }

    const existingStudent = await this.studentsRepo.findByPersonId(
      input.personId
    );

    if (existingStudent) {
      throw new BusinessError("O Estudante Pretendido já existe!");
    }

    const accessKey = this.codeGenerator.generateAccessKey(existingPerson.name);

    const newStudent = Students.create({
      personId: input.personId,
      classId: input.classId,
      accessKey,
    });

    const aStudent = await this.studentsRepo.save(newStudent.props);

    if (!aStudent?.studentId) {
      throw new ServerError("Erro ao criar o Estudante");
    }

    return { studentId: aStudent.studentId };
  }
}
