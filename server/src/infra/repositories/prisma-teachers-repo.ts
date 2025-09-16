import { TeachersProps } from "#core/entities/teachers.js";
import { TeachersRepository } from "#core/repositories/teachers-repo.js";
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

  async findAll(): Promise<TeachersProps[] | null> {
    const teachers = await this.prisma.teachers.findMany({
      include: {
        people: true,
      },
    });

    if (!teachers) {
      return null;
    }

    return teachers.map((item) => ({
      ...item,
    }));
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
