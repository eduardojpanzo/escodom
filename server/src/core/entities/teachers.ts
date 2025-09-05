export type TeachersProps = {
  teacherId?: string;
  personId: string;
  position: string;
  trainingYear: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Teachers {
  private constructor(readonly props: TeachersProps) {}

  public static create({ personId, position, trainingYear }: TeachersProps) {
    return new Teachers({
      teacherId: crypto.randomUUID().toString(),
      personId,
      trainingYear,
      position,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
