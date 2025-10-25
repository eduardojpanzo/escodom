export type StudentsProps = {
  studentId?: string;
  accessKey: string;
  personId: string;
  classroomId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Students {
  private constructor(readonly props: StudentsProps) {}

  public static create({ personId, accessKey, classroomId }: StudentsProps) {
    return new Students({
      studentId: crypto.randomUUID().toString(),
      accessKey,
      personId,
      classroomId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
