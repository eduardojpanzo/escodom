export class LevelsModel {
  static ENDPOINT = "/levels";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
}

export type LevelsProps = {
  levelId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};
