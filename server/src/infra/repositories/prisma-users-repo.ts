import { UsersProps } from "#core/entities/users.js";
import { UsersRepository } from "#core/repositories/users-repo.js";
import { PrismaClient } from "#generated/prisma/index.js";
import { omit } from "#utils/functions.js";

export class PrismaUsersRepository implements UsersRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaUsersRepository(prisma);
  }

  public async save(user: UsersProps) {
    const aUser = await this.prisma.users.create({
      data: {
        email: user.email,
        role: user.role,
        personId: user.personId,
        passwordHash: user.password,
      },
    });

    return {
      ...aUser,
      password: aUser.passwordHash,
    };
  }

  async findAll(): Promise<UsersProps[] | null> {
    const users = await this.prisma.users.findMany({
      include: {
        people: true,
      },
    });

    if (!users) {
      return null;
    }

    return users.map((item) =>
      omit(
        {
          ...item,
          password: item.passwordHash,
        },
        ["passwordHash"]
      )
    );
  }

  async findByPersonId(personId: string): Promise<UsersProps | null> {
    const aUser = await this.prisma.users.findUnique({
      where: {
        personId,
      },
      include: {
        people: true,
      },
    });

    if (!aUser) {
      return null;
    }

    return omit(
      {
        ...aUser,
        password: aUser.passwordHash,
      },
      ["passwordHash"]
    );
  }

  public async findByEmail(email: string) {
    const aUser = await this.prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        people: true,
      },
    });

    if (!aUser) {
      return null;
    }

    return omit(
      {
        ...aUser,
        password: aUser.passwordHash,
      },
      ["passwordHash"]
    );
  }
  public async findById(id: string) {
    const aUser = await this.prisma.users.findUnique({
      where: {
        userId: id,
      },
      include: {
        people: true,
      },
    });

    if (!aUser) {
      return null;
    }

    return omit(
      {
        ...aUser,
        password: aUser.passwordHash,
      },
      ["passwordHash"]
    );
  }

  public async update(id: string, user: Partial<UsersProps>) {
    await this.prisma.users.findUniqueOrThrow({
      where: {
        userId: id,
      },
    });

    const aUser = await this.prisma.users.update({
      where: {
        userId: id,
      },
      data: {
        ...user,
      },
    });

    return {
      ...aUser,
      password: aUser.passwordHash,
    };
  }

  async delete(id: string) {
    await this.prisma.users.findUniqueOrThrow({
      where: {
        userId: id,
      },
    });

    const aUser = await this.prisma.users.delete({
      where: {
        userId: id,
      },
    });

    return {
      ...aUser,
      password: aUser.passwordHash,
    };
  }

  async count(): Promise<number | null> {
    return await this.prisma.users.count();
  }
}
