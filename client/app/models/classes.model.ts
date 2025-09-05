import type { LevelsProps } from "./levels.model";

export class ClassesModel {
  static ENDPOINT = "/classes";
  static CREATE = `${this.ENDPOINT}/create`;
  static UPDATE = `${this.ENDPOINT}/updade`;
  static GET = `${this.ENDPOINT}/get`;
  static GETS = `${this.ENDPOINT}/list`;
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
