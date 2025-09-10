export type LevelsProps = {
  name: string;
  description?: string | null;
  levelId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Levels {
  private constructor(readonly props: LevelsProps) {}

  public static create({ name, description }: LevelsProps) {
    return new Levels({
      levelId: crypto.randomUUID().toString(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
