import { Users } from "#core/entities/users.js";
import { UsersRepository } from "#core/repositories/users-repo.js";
import { PrismaClient } from "#generated/prisma/index.js";

export class PrismaUsersRepository implements UsersRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaUsersRepository(prisma);
  }

  public async save(user: Users): Promise<void> {
    const userProps = user.props;

    await this.prisma.users.create({
      data: {
        email: userProps.email,
        passwordHash: userProps.password,
      },
    });
  }

  public async findByEmail(email: string): Promise<Users | null> {
    const aUser = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!aUser) {
      return null;
    }

    return Users.create({ ...aUser, password: aUser.passwordHash });
  }
  public async findById(id: string): Promise<Users | null> {
    const aUser = await this.prisma.users.findUnique({
      where: {
        userId: id,
      },
    });

    if (!aUser) {
      return null;
    }

    return Users.create({
      ...aUser,
      password: aUser.passwordHash,
    });
  }

  public async update(
    id: string,
    customer: Partial<Users>
  ): Promise<Users | null> {
    const aUser = await this.prisma.users.findUnique({
      where: {
        userId: id,
      },
    });

    if (!aUser) {
      return null;
    }

    await this.prisma.users.update({
      where: {
        userId: id,
      },
      data: {
        ...customer,
      },
    });

    return Users.create({
      ...aUser,
      password: aUser.passwordHash,
    });
  }
}
