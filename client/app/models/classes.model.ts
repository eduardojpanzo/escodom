import type { LevelsProps } from "./levels.model";

export class ClassesModel {
  static ENDPOINT = "/classes";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
}

export type ClassesProps = {
  classId: string;
  name: string;
  description?: string;
  levelId: string;
  level: LevelsProps;
  createdAt: Date;
  updatedAt: Date;
};
