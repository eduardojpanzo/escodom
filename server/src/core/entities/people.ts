export type PeopleProps = {
  name: string;
  bi: string;
  personId?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class People {
  private constructor(readonly props: PeopleProps) {}

  public static create({ name, bi, phone }: PeopleProps) {
    return new People({
      personId: crypto.randomUUID().toString(),
      name,
      bi,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
