import type { ClassesProps } from "./classes.model";
import type { PeopleProps } from "./people.model";

export class StudentsModel {
  static ENDPOINT = "/students";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
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
