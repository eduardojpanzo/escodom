import { TeachersProps } from "#core/entities/teachers.js";
import { TeachersRepository } from "#core/repositories/teachers-repo.js";
import { TeacherFilterParams } from "#core/use-cases/teacher.js";
import { PrismaClient } from "#generated/prisma/index.js";

export class PrismaTeachersRepository implements TeachersRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaTeachersRepository(prisma);
  }

  public async save(teacher: TeachersProps) {
    const aTeacher = await this.prisma.teachers.create({
      data: {
        ...teacher,
      },
    });

    return {
      ...aTeacher,
    };
  }

  async findAll(
    filters: TeacherFilterParams
  ): Promise<{ data: TeachersProps[]; totalCount: number }> {
    const { pageNumber, pageSize, position, trainingYear, name, orderBy } =
      filters;

    const where: any = {};
    if (position) where.position = { contains: position, mode: "insensitive" };
    if (trainingYear) where.trainingYear = { equals: trainingYear };
    if (name) where.people = { name: { contains: name, mode: "insensitive" } };

    const orderByClause = orderBy?.map((field) => ({
      [field]: "asc" as const,
    }));

    const [data, totalCount] = await Promise.all([
      this.prisma.teachers.findMany({
        where,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: orderByClause,
        include: { people: true },
      }),

      this.prisma.teachers.count({ where }),
    ]);

    return {
      data: data.map((item) => ({
        ...item,
      })),
      totalCount,
    };
  }

  public async findByPersonId(personId: string) {
    const aTeacher = await this.prisma.teachers.findUnique({
      where: {
        personId,
      },
      include: {
        people: true,
      },
    });

    if (!aTeacher) {
      return null;
    }

    return {
      ...aTeacher,
    };
  }
  public async findById(id: string) {
    const aTeacher = await this.prisma.teachers.findUnique({
      where: {
        teacherId: id,
      },
      include: {
        people: true,
      },
    });

    if (!aTeacher) {
      return null;
    }

    return {
      ...aTeacher,
    };
  }

  public async update(id: string, teacher: Partial<TeachersProps>) {
    await this.prisma.teachers.findUniqueOrThrow({
      where: {
        teacherId: id,
      },
    });

    const aTeacher = await this.prisma.teachers.update({
      where: {
        teacherId: id,
      },
      data: {
        ...teacher,
      },
    });

    return {
      ...aTeacher,
    };
  }

  async delete(id: string) {
    await this.prisma.teachers.findUniqueOrThrow({
      where: {
        teacherId: id,
      },
    });

    const aTeacher = await this.prisma.teachers.delete({
      where: {
        teacherId: id,
      },
    });

    return {
      ...aTeacher,
    };
  }
}
