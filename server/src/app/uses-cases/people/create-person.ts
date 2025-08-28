import { BusinessError } from "#core/errors/business_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ICreatePersonUseCase } from "#core/use-cases/people.js";
import { CreatePersonInputDto } from "#app/dtos/people-dto.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { People } from "#core/entities/people.js";

export class CreatePersonUseCase implements ICreatePersonUseCase {
  constructor(private peopleRepo: PeopleRepository) {}

  async execute(input: CreatePersonInputDto) {
    const existingPerson = await this.peopleRepo.findByBi(input.bi);

    if (existingPerson) {
      throw new BusinessError("O Número do BI informado já está em uso");
    }

    const newPerson = People.create({
      ...input,
    });

    const aPerson = await this.peopleRepo.save(newPerson.props);

    if (!aPerson?.personId) {
      throw new ServerError("Erro ao criar a Entidade");
    }

    return { personId: aPerson.personId };
  }
}
