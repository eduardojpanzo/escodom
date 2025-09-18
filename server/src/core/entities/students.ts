export type StudentsProps = {
  studentId?: string;
  accessKey: string;
  personId: string;
  classId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Students {
  private constructor(readonly props: StudentsProps) {}

  public static create({ personId, accessKey, classId }: StudentsProps) {
    return new Students({
      studentId: crypto.randomUUID().toString(),
      accessKey,
      personId,
      classId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
