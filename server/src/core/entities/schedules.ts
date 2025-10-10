export type SchedulesProps = {
  scheduleId?: string;
  teacherId: string;
  classId: string;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Schedules {
  private constructor(readonly props: SchedulesProps) {}

  public static create({
    teacherId,
    classId,
    startDate,
    endDate,
  }: SchedulesProps) {
    return new Schedules({
      scheduleId: crypto.randomUUID().toString(),
      teacherId,
      classId,
      startDate,
      endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
