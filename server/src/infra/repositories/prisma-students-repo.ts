import { StudentsProps } from "#core/entities/students.js";
import { StudentsRepository } from "#core/repositories/students-repo.js";
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

  async findAll(): Promise<StudentsProps[] | null> {
    const students = await this.prisma.students.findMany({
      include: {
        people: true,
      },
    });

    if (!students) {
      return null;
    }

    return students.map((item) => ({
      ...item,
    }));
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
