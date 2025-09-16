import { ClassesProps } from "#core/entities/classes.js";
import { ClassesRepository } from "#core/repositories/classes-repo.js";
import { ClassFilterParams } from "#core/use-cases/class.js";
import { PrismaClient } from "#generated/prisma/index.js";

export class PrismaClassesRepository implements ClassesRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaClassesRepository(prisma);
  }

  public async save(data: ClassesProps) {
    const aClass = await this.prisma.classes.create({
      data: {
        ...data,
      },
    });

    return {
      ...aClass,
      description: aClass.description || undefined,
    };
  }

  async findAll(
    filters: ClassFilterParams
  ): Promise<{ data: ClassesProps[]; totalCount: number }> {
    const { pageNumber, pageSize, levelId, orderBy } = filters;

    const where: any = {};
    if (levelId) where.levelId = levelId;

    const orderByClause = orderBy?.map((field) => ({
      [field]: "asc" as const,
    }));

    const [data, totalCount] = await Promise.all([
      this.prisma.classes.findMany({
        where,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: orderByClause,
        include: { levels: true },
      }),

      this.prisma.classes.count({ where }),
    ]);

    return {
      data,
      totalCount,
    };
  }

  public async findByName(name: string) {
    const aClass = await this.prisma.classes.findUnique({
      where: {
        name,
      },
      include: {
        levels: true,
      },
    });

    if (!aClass) {
      return null;
    }

    return {
      ...aClass,
      description: aClass.description || undefined,
    };
  }
  public async findById(id: string) {
    const aClass = await this.prisma.classes.findUnique({
      where: {
        classId: id,
      },
      include: {
        levels: true,
      },
    });

    if (!aClass) {
      return null;
    }

    return {
      ...aClass,
      description: aClass.description || undefined,
    };
  }

  async findByLevel(levelId: string): Promise<ClassesProps[] | null> {
    const classes = await this.prisma.classes.findMany({
      where: {
        levelId,
      },
      include: {
        levels: true,
      },
    });

    if (!classes) {
      return null;
    }

    return classes.map((item) => ({
      ...item,
      description: item.description || undefined,
    }));
  }

  public async update(id: string, data: Partial<ClassesProps>) {
    await this.prisma.classes.findUniqueOrThrow({
      where: {
        classId: id,
      },
    });

    const aClass = await this.prisma.classes.update({
      where: {
        classId: id,
      },
      data: {
        ...data,
      },
    });

    return {
      ...aClass,
      description: aClass.description || undefined,
    };
  }

  async delete(id: string) {
    await this.prisma.classes.findUniqueOrThrow({
      where: {
        classId: id,
      },
    });

    const aClass = await this.prisma.classes.delete({
      where: {
        classId: id,
      },
    });

    return {
      ...aClass,
      description: aClass.description || undefined,
    };
  }
}
