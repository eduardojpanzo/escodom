export type ClassesProps = {
  classId?: string;
  name: string;
  description?: string;
  levelId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Classes {
  private constructor(readonly props: ClassesProps) {}

  public static create({ levelId, description, name }: ClassesProps) {
    return new Classes({
      classId: crypto.randomUUID().toString(),
      name,
      description,
      levelId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
