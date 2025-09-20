import type { ClassesProps } from "./classes.model";
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
  people: PeopleProps;
  birthDate: Date;
  classId: string;
  classes: ClassesProps;
  createdAt: Date;
  updatedAt: Date;
};
