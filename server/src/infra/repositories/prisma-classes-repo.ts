import { ClassesProps } from "#core/entities/classes.js";
import { ClassesRepository } from "#core/repositories/classes-repo.js";
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

  public async findByName(name: string) {
    const aClass = await this.prisma.classes.findUnique({
      where: {
        name,
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
