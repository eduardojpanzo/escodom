import { SchedulesProps } from "#core/entities/schedules.js";
import { BusinessError } from "#core/errors/business_error.js";
import { SchedulesRepository } from "#core/repositories/schedules-repo.js";
import { ScheduleFilterParams } from "#core/use-cases/schedules.js";
import { PrismaClientExtendType } from "#infra/db/prima.js";

export class PrismaSchedulesRepository implements SchedulesRepository {
  private constructor(readonly prisma: PrismaClientExtendType) {}
  public static build(prisma: PrismaClientExtendType) {
    return new PrismaSchedulesRepository(prisma);
  }

  public async save(data: SchedulesProps) {
    const overlapping = await this.prisma.schedules.findFirst({
      where: {
        teacherId: data.teacherId,
        OR: [
          {
            startDate: { lte: data.endDate },
            endDate: { gte: data.startDate },
          },
        ],
      },
    });

    if (overlapping) {
      throw new BusinessError(
        "Este monitor já possui uma escala nesse período."
      );
    }

    const aSchedule = await this.prisma.schedules.create({
      data: {
        ...data,
      },
    });

    return {
      ...aSchedule,
    };
  }

  async findAll(
    filters: ScheduleFilterParams
  ): Promise<{ data: SchedulesProps[]; totalCount: number }> {
    const today = new Date();
    const {
      pageNumber,
      pageSize,
      classroomId,
      endDate,
      startDate,
      teacherId,
      active,
      orderBy,
    } = filters;

    const where: any = {};
    if (classroomId) where.classroomId = classroomId;
    if (teacherId) where.teacherId = teacherId;
    if (startDate)
      where.startDate = active ? { lte: today, equal: startDate } : startDate;
    if (endDate)
      where.endDate = active ? { gte: today, equal: endDate } : endDate;
    if (active) {
      where.endDate = endDate ? { gte: today, equal: endDate } : today;
      where.startDate = startDate ? { lte: today, equal: startDate } : today;
    }

    const orderByClause = orderBy?.map((field) => ({
      [field]: "asc" as const,
    }));

    const [data, totalCount] = await Promise.all([
      this.prisma.schedules.findMany({
        where,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: orderByClause,
        include: { Classrooms: true, teachers: true },
      }),

      this.prisma.schedules.count({ where }),
    ]);

    return {
      data,
      totalCount,
    };
  }

  public async findById(id: string) {
    const aSchedule = await this.prisma.schedules.findUnique({
      where: {
        scheduleId: id,
      },
      include: {
        Classrooms: true,
        teachers: true,
      },
    });

    if (!aSchedule) {
      return null;
    }

    return {
      ...aSchedule,
    };
  }

  public async update(id: string, data: Partial<SchedulesProps>) {
    await this.prisma.schedules.findUniqueOrThrow({
      where: {
        scheduleId: id,
      },
    });

    const aSchedule = await this.prisma.schedules.update({
      where: {
        scheduleId: id,
      },
      data: {
        ...data,
      },
    });

    return {
      ...aSchedule,
    };
  }

  async delete(id: string) {
    await this.prisma.schedules.findUniqueOrThrow({
      where: {
        scheduleId: id,
      },
    });

    const aSchedule = await this.prisma.schedules.delete({
      where: {
        scheduleId: id,
      },
    });

    return {
      ...aSchedule,
    };
  }

  async count(): Promise<number | null> {
    return await this.prisma.schedules.count();
  }
}
