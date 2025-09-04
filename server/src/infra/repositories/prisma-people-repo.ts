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
    const aPerson = await this.prisma.people.findUnique({
      where: {
        bi,
      },
      include: {
        students: true,
        teachers: true,
        users: {
          omit: {
            passwordHash: true,
          },
        },
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
  public async findById(id: string) {
    const aPerson = await this.prisma.people.findUnique({
      where: {
        personId: id,
      },
      include: {
        students: true,
        teachers: true,
        users: {
          omit: {
            passwordHash: true,
          },
        },
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

  public async update(id: string, person: Partial<PeopleProps>) {
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
        ...person,
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
