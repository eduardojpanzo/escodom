import { ClassroomsProps } from "#core/entities/classrooms.js";
import { ClassroomsRepository } from "#core/repositories/classrooms-repo.js";
import { ClassroomFilterParams } from "#core/use-cases/classroom.js";
import { PrismaClientExtendType } from "#infra/db/prima.js";

export class PrismaClassroomsRepository implements ClassroomsRepository {
  private constructor(readonly prisma: PrismaClientExtendType) {}
  public static build(prisma: PrismaClientExtendType) {
    return new PrismaClassroomsRepository(prisma);
  }

  public async save(data: ClassroomsProps) {
    const aClassroom = await this.prisma.classrooms.create({
      data,
    });

    return {
      ...aClassroom,
      description: aClassroom.description || undefined,
    };
  }

  async findAll(
    filters: ClassroomFilterParams
  ): Promise<{ data: ClassroomsProps[]; totalCount: number }> {
    const { pageNumber, pageSize, levelId, orderBy } = filters;

    const where: any = {};
    if (levelId) where.levelId = levelId;

    const orderByClause = orderBy?.map((field) => ({
      [field]: "asc" as const,
    }));

    const [data, totalCount] = await Promise.all([
      this.prisma.classrooms.findMany({
        where,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: orderByClause,
        include: {
          classes: {
            include: {
              levels: {
                select: {
                  name: true,
                  levelId: true,
                },
              },
            },
          },
        },
      }),

      this.prisma.classrooms.count({ where }),
    ]);

    return {
      data,
      totalCount,
    };
  }

  public async findByName(name: string) {
    const aClassroom = await this.prisma.classrooms.findUnique({
      where: {
        name,
      },
      include: {
        classes: {
          include: {
            levels: {
              select: {
                name: true,
                levelId: true,
              },
            },
          },
        },
      },
    });

    if (!aClassroom) {
      return null;
    }

    return {
      ...aClassroom,
      description: aClassroom.description || undefined,
    };
  }
  public async findById(id: string) {
    const aClassroom = await this.prisma.classrooms.findUnique({
      where: {
        classroomId: id,
      },
      include: {
        classes: {
          include: {
            levels: {
              select: {
                name: true,
                levelId: true,
              },
            },
          },
        },
      },
    });

    if (!aClassroom) {
      return null;
    }

    return {
      ...aClassroom,
      description: aClassroom.description || undefined,
    };
  }

  async findByClass(classId: string): Promise<ClassroomsProps[] | null> {
    const classrooms = await this.prisma.classrooms.findMany({
      where: {
        classId,
      },
      include: {
        classes: {
          include: {
            levels: {
              select: {
                name: true,
                levelId: true,
              },
            },
          },
        },
      },
    });

    if (!classrooms) {
      return null;
    }

    return classrooms.map((item) => ({
      ...item,
      description: item.description || undefined,
    }));
  }

  public async update(id: string, data: Partial<ClassroomsProps>) {
    await this.prisma.classrooms.findUniqueOrThrow({
      where: {
        classroomId: id,
      },
    });

    const aClassroom = await this.prisma.classrooms.update({
      where: {
        classroomId: id,
      },
      data: {
        ...data,
      },
    });

    return {
      ...aClassroom,
      description: aClassroom.description || undefined,
    };
  }

  async delete(id: string) {
    await this.prisma.classrooms.findUniqueOrThrow({
      where: {
        classroomId: id,
      },
    });

    const aClassroom = await this.prisma.classrooms.delete({
      where: {
        classroomId: id,
      },
    });

    return {
      ...aClassroom,
      description: aClassroom.description || undefined,
    };
  }
}
