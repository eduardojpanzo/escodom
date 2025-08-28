import { PeopleProps } from "#core/entities/people.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { IChangePersonDataUseCase } from "#core/use-cases/people.js";

export class ChangePersonDataUseCase implements IChangePersonDataUseCase {
  constructor(private peopleRepo: PeopleRepository) {}
  async execute(personId: string, data: Partial<PeopleProps>) {
    const existingPerson = await this.peopleRepo.findById(personId);

    if (!existingPerson || !existingPerson.personId || !existingPerson.name) {
      throw new NotFoundError("A Entidade não foi encotrado");
    }

    const aPerson = await this.peopleRepo.update(personId, {
      ...data,
    });

    if (!aPerson?.personId) {
      throw new ServerError("Erro ao atualizar os dados do usuário");
    }

    return {
      personId: aPerson.personId,
    };
  }
}
