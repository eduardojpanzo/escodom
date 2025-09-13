import { nanoid } from "nanoid";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { CodeGeneratorService } from "#core/services/code-generator.js";
import { getInitials } from "#utils/functions.js";

export class CodeGeneratorImplementation implements CodeGeneratorService {
  constructor(private peopleRepo: PeopleRepository) {}
  async generateAPersonalCode(
    name: string,
    type: "outro" | "monitor" | "aluno",
    baptized: "yes" | "no"
  ): Promise<string> {
    const initials = getInitials(name);
    const year = new Date().getFullYear();
    const typeCode = type.substring(0, 2).toUpperCase();
    const baptizedCode = baptized === "yes" ? "Y" : "N";

    const nextNumber = await this.getNextSequence();

    return `${initials}-${year}-${typeCode}-${baptizedCode}-${nextNumber}`;
  }

  generateAccessKey(name: string): string {
    const initials = getInitials(name);
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    const randomPart = nanoid(6).toUpperCase();

    return `STU-${yearMonth}-${initials}-${randomPart}`;
  }

  private async getNextSequence(): Promise<number> {
    const lastPerson = await this.peopleRepo.findLastCreated();
    if (!lastPerson?.personalCode) return 1;

    const parts = lastPerson.personalCode.split("-");
    const lastSeq = parseInt(parts[parts.length - 1], 10);

    return isNaN(lastSeq) ? 1 : lastSeq + 1;
  }
}
