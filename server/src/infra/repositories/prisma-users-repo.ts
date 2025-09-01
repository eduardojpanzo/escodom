import { UsersProps } from "#core/entities/users.js";
import { UsersRepository } from "#core/repositories/users-repo.js";
import { PrismaClient } from "#generated/prisma/index.js";

export class PrismaUsersRepository implements UsersRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaUsersRepository(prisma);
  }

  public async save(user: UsersProps) {
    const aUser = await this.prisma.users.create({
      data: {
        ...user,
        passwordHash: user.password,
      },
    });

    return {
      ...aUser,
      password: aUser.passwordHash,
    };
  }

  public async findByEmail(email: string) {
    const aUser = await this.prisma.users.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return {
      ...aUser,
      password: aUser.passwordHash,
    };
  }
  public async findById(id: string) {
    const aUser = await this.prisma.users.findUniqueOrThrow({
      where: {
        userId: id,
      },
    });

    if (!aUser) {
      return null;
    }

    return {
      ...aUser,
      password: aUser.passwordHash,
    };
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
}
