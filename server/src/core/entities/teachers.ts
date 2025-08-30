export type TeachersProps = {
  teacherId?: string;
  personId: string;
  position: string;
  trainingYear: Date;
};

export class Teachers {
  private constructor(readonly props: TeachersProps) {}

  public static create({ personId, position, trainingYear }: TeachersProps) {
    return new Teachers({
      teacherId: crypto.randomUUID().toString(),
      personId,
      trainingYear,
      position,
    });
  }
}
