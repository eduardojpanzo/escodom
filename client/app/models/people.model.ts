import type { StudentsProps } from "./students.model";

export class PeopleModel {
  static ENDPOINT = "";
  static CREATE = `${this.ENDPOINT}/create`;
  static UPDATE = `${this.ENDPOINT}/updade`;
  static GET = `${this.ENDPOINT}/get`;
  static GETS = `${this.ENDPOINT}/list`;
}

export type PeopleProps = {
  name: string;
  personalCode: string;
  personId: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};
