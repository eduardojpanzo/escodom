export class LevelsModel {
  static ENDPOINT = "/levels";
  static CREATE = `${this.ENDPOINT}/create`;
  static UPDATE = `${this.ENDPOINT}/updade`;
  static GET = `${this.ENDPOINT}/get`;
  static GETS = `${this.ENDPOINT}/list`;
}

export type LevelsProps = {
  levelId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};
