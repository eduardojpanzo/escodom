export type PeopleProps = {
  personId?: string;
  name: string;
  // bi: string;
  personalCode: string;
  birthDate: Date;
  baptized: "no" | "yes";
  profession?: string | null;
  phone?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export class People {
  private constructor(readonly props: PeopleProps) {}

  public static create({
    name,
    personalCode,
    phone,
    baptized,
    birthDate,
    profession,
  }: PeopleProps) {
    return new People({
      personId: crypto.randomUUID().toString(),
      name,
      personalCode,
      phone,
      baptized,
      birthDate,
      profession,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
