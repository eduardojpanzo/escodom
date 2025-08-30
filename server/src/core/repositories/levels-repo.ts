import { LevelsProps } from "#core/entities/levels.js";

export interface LevelsRepository {
  save(levelId: LevelsProps): Promise<LevelsProps | null>;
  findById(id: string): Promise<LevelsProps | null>;
  findByName(name: string): Promise<LevelsProps | null>;
  update(
    id: string,
    levelId: Partial<LevelsProps>
  ): Promise<LevelsProps | null>;
  delete(id: string): Promise<LevelsProps | null>;
}
