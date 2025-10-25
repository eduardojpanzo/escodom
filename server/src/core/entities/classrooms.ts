export type ClassroomsProps = {
  classroomId?: string;
  name: string;
  description?: string | null;
  classId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Classrooms {
  private constructor(readonly props: ClassroomsProps) {}

  public static create({ classId, description, name }: ClassroomsProps) {
    return new Classrooms({
      classroomId: crypto.randomUUID().toString(),
      name,
      description,
      classId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
