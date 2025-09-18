import { StudentsProps } from "#core/entities/students.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
import { StudentFilterParams } from "#core/use-cases/stundet.js";
import { PrismaClient } from "#generated/prisma/index.js";

export class PrismaStudentsRepository implements StudentsRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaStudentsRepository(prisma);
  }

  public async save(student: StudentsProps) {
    const aStudent = await this.prisma.students.create({
      data: {
        ...student,
      },
    });

    return {
      ...aStudent,
    };
  }

  async findAll(
    filters: StudentFilterParams
  ): Promise<{ data: StudentsProps[]; totalCount: number }> {
    const { pageNumber, pageSize, classId, levelId, name, orderBy } = filters;

    const where: any = {};
    if (name) where.people = { name: { contains: name, mode: "insensitive" } };
    if (levelId) where.classes = { levelId: { equals: levelId } };
    if (classId) where.classId = classId;

    const orderByClause = orderBy?.map((field) => ({
      [field]: "asc" as const,
    }));

    const [data, totalCount] = await Promise.all([
      this.prisma.students.findMany({
        where,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: orderByClause,
        include: { people: true },
      }),

      this.prisma.students.count({ where }),
    ]);

    return {
      data,
      totalCount,
    };
  }

  public async findByPersonId(personId: string) {
    const aStudent = await this.prisma.students.findUnique({
      where: {
        personId,
      },
    });

    if (!aStudent) {
      return null;
    }

    return {
      ...aStudent,
    };
  }
  public async findById(id: string) {
    const aStudent = await this.prisma.students.findUnique({
      where: {
        studentId: id,
      },
      include: {
        people: true,
      },
    });

    if (!aStudent) {
      return null;
    }

    return {
      ...aStudent,
    };
  }

  async findByAccessKey(accessKey: string): Promise<StudentsProps | null> {
    const aStudent = await this.prisma.students.findUnique({
      where: {
        accessKey,
      },
      include: {
        people: true,
      },
    });

    if (!aStudent) {
      return null;
    }

    return {
      ...aStudent,
    };
  }

  public async update(id: string, student: Partial<StudentsProps>) {
    await this.prisma.students.findUniqueOrThrow({
      where: {
        studentId: id,
      },
    });

    const aStudent = await this.prisma.students.update({
      where: {
        studentId: id,
      },
      data: {
        ...student,
      },
    });

    return {
      ...aStudent,
    };
  }

  async delete(id: string) {
    await this.prisma.students.findUniqueOrThrow({
      where: {
        studentId: id,
      },
    });

    const aStudent = await this.prisma.students.delete({
      where: {
        studentId: id,
      },
    });

    return {
      ...aStudent,
    };
  }
}
