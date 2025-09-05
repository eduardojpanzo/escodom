import type { PeopleProps } from "./people.model";

export class StudentsModel {
  static ENDPOINT = "/students";
  static CREATE = `${this.ENDPOINT}/create`;
  static UPDATE = `${this.ENDPOINT}/updade`;
  static GET = `${this.ENDPOINT}/get`;
  static GETS = `${this.ENDPOINT}/list`;
}

export type StudentsProps = {
  studentId: string;
  accessKey: string;
  personId: string;
  person: PeopleProps;
  birthDate: Date;
  classId: string;
  createdAt: Date;
  updatedAt: Date;
};
