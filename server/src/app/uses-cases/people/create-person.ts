import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ICreatePersonUseCase } from "#core/use-cases/people.js";
import { CreatePersonInputDto } from "#app/dtos/people-dto.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { People } from "#core/entities/people.js";
import { CodeGeneratorService } from "#core/services/code-generator.js";

export class CreatePersonUseCase implements ICreatePersonUseCase {
  constructor(
    private peopleRepo: PeopleRepository,
    private codeGenerator: CodeGeneratorService
  ) {}

  async execute(input: CreatePersonInputDto) {
    // const existingPerson = await this.peopleRepo.findByBi(input.bi);

    // if (existingPerson) {
    //   throw new BusinessError("O Número do BI informado já está em uso");
    // }

    const personalCode = await this.codeGenerator.generateAPersonalCode(
      input.name,
      input.type ? input.type : "outro",
      input.baptized
    );

    const newPerson = People.create({
      name: input.name,
      personalCode,
      birthDate: input.birthDate,
      baptized: input.baptized,
      phone: input.phone,
      profession: input.profession,
    });

    const aPerson = await this.peopleRepo.save(newPerson.props);

    if (!aPerson?.personId) {
      throw new ServerError("Erro ao criar a Entidade");
    }

    return { personId: aPerson.personId };
  }
}
