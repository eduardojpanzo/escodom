export class PeopleModel {
  static ENDPOINT = "people";
  static CREATE = `${this.ENDPOINT}/create`;
}

export type PeopleProps = {
  name: string;
  personalCode: string;
  personId: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};
