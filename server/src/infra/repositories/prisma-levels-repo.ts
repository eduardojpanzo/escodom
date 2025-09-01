import { LevelsProps } from "#core/entities/levels.js";
import { LevelsRepository } from "#core/repositories/levels-repo.js";
import { PrismaClient } from "#generated/prisma/index.js";

export class PrismaLevelsRepository implements LevelsRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new PrismaLevelsRepository(prisma);
  }

  public async save(level: LevelsProps) {
    const aLevel = await this.prisma.levels.create({
      data: {
        ...level,
      },
    });

    return {
      ...aLevel,
      description: aLevel.description || undefined,
    };
  }

  public async findByName(name: string) {
    const aLevel = await this.prisma.levels.findUniqueOrThrow({
      where: {
        name,
      },
    });

    return {
      ...aLevel,
      description: aLevel.description || undefined,
    };
  }
  public async findById(id: string) {
    const aLevel = await this.prisma.levels.findUniqueOrThrow({
      where: {
        levelId: id,
      },
    });

    if (!aLevel) {
      return null;
    }

    return {
      ...aLevel,
      description: aLevel.description || undefined,
    };
  }

  public async update(id: string, Level: Partial<LevelsProps>) {
    await this.prisma.levels.findUniqueOrThrow({
      where: {
        levelId: id,
      },
    });

    const aLevel = await this.prisma.levels.update({
      where: {
        levelId: id,
      },
      data: {
        ...Level,
      },
    });

    return {
      ...aLevel,
      description: aLevel.description || undefined,
    };
  }

  async delete(id: string) {
    await this.prisma.levels.findUniqueOrThrow({
      where: {
        levelId: id,
      },
    });

    const aLevel = await this.prisma.levels.delete({
      where: {
        levelId: id,
      },
    });

    return {
      ...aLevel,
      description: aLevel.description || undefined,
    };
  }
}
