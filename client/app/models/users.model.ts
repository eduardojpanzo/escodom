import type { PeopleProps } from "./people.model";

export class UsersModel {
  static ENDPOINT = "";
  static CREATE = `${this.ENDPOINT}/create`;
  static UPDATE = `${this.ENDPOINT}/updade`;
  static GET = `${this.ENDPOINT}/get`;
  static GETS = `${this.ENDPOINT}/list`;
}

export type UsersProps = {
  email: string;
  password: string;
  personId: string;
  person: PeopleProps;
  userId?: string;
  role?: "teacher" | "student";
  createdAt?: Date;
  updatedAt?: Date;
};
