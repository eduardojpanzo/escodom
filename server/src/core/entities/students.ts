export type StudentsProps = {
  studentId?: string;
  accessKey: string;
  personId: string;
  birthDate: Date;
  classId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Students {
  private constructor(readonly props: StudentsProps) {}

  public static create({
    personId,
    accessKey,
    birthDate,
    classId,
  }: StudentsProps) {
    return new Students({
      studentId: crypto.randomUUID().toString(),
      accessKey,
      personId,
      birthDate,
      classId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
