export type SchedulesProps = {
  scheduleId?: string;
  teacherId: string;
  classroomId: string;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Schedules {
  private constructor(readonly props: SchedulesProps) {}

  public static create({
    teacherId,
    classroomId,
    startDate,
    endDate,
  }: SchedulesProps) {
    return new Schedules({
      scheduleId: crypto.randomUUID().toString(),
      teacherId,
      classroomId,
      startDate,
      endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
