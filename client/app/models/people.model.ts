export class PeopleModel {
  static ENDPOINT = "people";
  static CREATE = `${this.ENDPOINT}/create`;
}

export type PeopleProps = {
  name: string;
  personalCode: string;
  personId: string;
  baptized: "no" | "yes";
  profession?: string;
  birthDate?: Date;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};
