import { PaginationParams } from "#core/common/pagination.js";
import { PeopleProps } from "#core/entities/people.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";
import { PrismaClient } from "#generated/prisma/index.js";

export class PrismaPeopleRepository implements PeopleRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaPeopleRepository(prisma);
  }

  async save(person: PeopleProps): Promise<PeopleProps | null> {
    const aPerson = await this.prisma.people.create({
      data: {
        ...person,
      },
    });

    return {
      ...aPerson,
    };
  }

  async findAll(
    filters: PaginationParams
  ): Promise<{ data: PeopleProps[]; totalCount: number }> {
    const { pageNumber, pageSize, orderBy } = filters;

    const orderByClause = orderBy?.map((field) => ({
      [field]: "asc" as const,
    }));

    const [data, totalCount] = await Promise.all([
      this.prisma.people.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: orderByClause,
      }),

      this.prisma.people.count(),
    ]);

    return {
      data,
      totalCount,
    };
  }

  public async findByPersonalCode(
    personalCode: string
  ): Promise<PeopleProps | null> {
    const aPerson = await this.prisma.people.findUnique({
      where: {
        personalCode,
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
    };
  }

  public async findById(id: string): Promise<PeopleProps | null> {
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
    };
  }

  public async update(
    id: string,
    person: Partial<PeopleProps>
  ): Promise<PeopleProps | null> {
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
    };
  }

  async delete(id: string): Promise<PeopleProps | null> {
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
    };
  }

  async count(): Promise<number | null> {
    return await this.prisma.people.count();
  }

  async findLastCreated(): Promise<PeopleProps | null> {
    const row = await this.prisma.people.findFirst({
      orderBy: { createdAt: "desc" },
    });
    return row || null;
  }
}
