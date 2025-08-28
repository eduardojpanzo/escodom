import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { IDeletePersonUseCase } from "#core/use-cases/people.js";

export class DeletePersonUseCase implements IDeletePersonUseCase {
  constructor(private peopleRepo: PeopleRepository) {}
  async execute(personId: string) {
    const existingPeople = await this.peopleRepo.findById(personId);

    if (!existingPeople || !existingPeople.personId || !existingPeople.bi) {
      throw new NotFoundError("A Entidade não foi encotrado");
    }

    const aPerson = await this.peopleRepo.delete(personId);

    if (!aPerson?.personId) {
      throw new ServerError("Erro ao Eliminar dos do usuário");
    }

    return {
      personId: aPerson.personId,
    };
  }
}
