export type UsersProps = {
  email: string;
  password: string;
  personId: string;
  userId?: string;
  role?: "teacher" | "student";
  createdAt?: Date;
  updatedAt?: Date;
};

export class Users {
  private constructor(readonly props: UsersProps) {}

  public static create({
    email,
    password,
    personId,
    role = "teacher",
  }: UsersProps) {
    return new Users({
      userId: crypto.randomUUID().toString(),
      email,
      password,
      personId,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  changePassword(newHash: string) {
    this.props.password = newHash;
  }

  isTeacher(): boolean {
    return this.props.role === "teacher";
  }
}
