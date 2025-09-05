import { CreateClassInputDto } from "#app/dtos/classes-dto.js";
import { Classes } from "#core/entities/classes.js";
import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ClassesRepository } from "#core/repositories/classes-repo.js";
import { ICreateClassUseCase } from "#core/use-cases/class.js";

export class CreateClassUseCase implements ICreateClassUseCase {
  constructor(private classesRepo: ClassesRepository) {}

  async execute(input: CreateClassInputDto) {
    const existingClass = await this.classesRepo.findByName(input.name);

    if (existingClass) {
      throw new BusinessError("O Classe Pretendido já existe!");
    }

    const newClass = Classes.create({
      ...input,
    });

    const aClass = await this.classesRepo.save(newClass.props);

    if (!aClass?.classId) {
      throw new ServerError("Erro ao criar o Classe");
    }

    return { classId: aClass.classId };
  }
}
