import { NotFoundError } from "#core/errors/notfound_error.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { IGetPersonUseCase } from "#core/use-cases/people.js";

export class GetPersonUseCase implements IGetPersonUseCase {
  constructor(private peopleRepo: PeopleRepository) {}
  async execute({ bi, personId }: { personId?: string; bi?: string }) {
    const aPerson = personId
      ? await this.peopleRepo.findById(personId)
      : bi
      ? await this.peopleRepo.findByBi(bi)
      : null;
    if (!aPerson) {
      throw new NotFoundError("O Usuário não foi encotrado");
    }

    return aPerson;
  }
}
