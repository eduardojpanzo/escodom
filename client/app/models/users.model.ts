import type { PeopleProps } from "./people.model";
import type { StudentsProps } from "./students.model";
import type { TeachersProps } from "./teachers.model";

export class UsersModel {
  static ENDPOINT = "/users";
  static CREATE = `${this.ENDPOINT}/create`;
  static UPDATE = `${this.ENDPOINT}/updade`;
  static GET = `${this.ENDPOINT}/get`;
  static GETS = `${this.ENDPOINT}/list`;
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
