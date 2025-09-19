import type { PeopleProps } from "./people.model";
import type { StudentsProps } from "./students.model";
import type { TeachersProps } from "./teachers.model";

export class UsersModel {
  static ENDPOINT = "/users";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
  static SIGN = `${this.ENDPOINT}/singin`;
  static PROFILE = `${this.ENDPOINT}/profile`;
  static CREATEFROM = `${this.ENDPOINT}/create-from-person`;
  static CHANGEPASSWORD = `${this.ENDPOINT}/change-password`;
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

export type Profile = {
  name: string;
  personalCode: string;
  personId: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  students?: StudentsProps;
  users?: UsersProps;
  teachers?: TeachersProps;
};
