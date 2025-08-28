import { PeopleProps } from "#core/entities/people.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { PrismaClient } from "#generated/prisma/index.js";

export class PrismaPeopleRepository implements PeopleRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaPeopleRepository(prisma);
  }

  public async save(person: PeopleProps) {
    const aPerson = await this.prisma.people.create({
      data: {
        ...person,
      },
    });

    return {
      ...aPerson,
      phone: aPerson.phone ?? undefined,
    };
  }

  public async findByBi(bi: string) {
    const aPerson = await this.prisma.people.findUniqueOrThrow({
      where: {
        bi,
      },
    });

    return {
      ...aPerson,
      phone: aPerson.phone ?? undefined,
    };
  }
  public async findById(id: string) {
    const aPerson = await this.prisma.people.findUniqueOrThrow({
      where: {
        personId: id,
      },
    });

    if (!aPerson) {
      return null;
    }

    return {
      ...aPerson,
      phone: aPerson.phone ?? undefined,
    };
  }

  public async update(id: string, customer: Partial<PeopleProps>) {
    await this.prisma.people.findUniqueOrThrow({
      where: {
        personId: id,
      },
    });

    const aPerson = await this.prisma.people.update({
      where: {
        personId: id,
      },
      data: {
        ...customer,
      },
    });

    return {
      ...aPerson,
      phone: aPerson.phone ?? undefined,
    };
  }

  async delete(id: string) {
    await this.prisma.people.findUniqueOrThrow({
      where: {
        personId: id,
      },
    });

    const aPerson = await this.prisma.people.delete({
      where: {
        personId: id,
      },
    });

    return {
      ...aPerson,
      phone: aPerson.phone ?? undefined,
    };
  }
}
