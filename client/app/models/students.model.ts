import type { ClassesProps } from "./classes.model";
import type { ClassroomsProps } from "./classrooms.model";
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
  classroomId: string;
  classrooms?: ClassroomsProps;
  people?: PeopleProps;
  createdAt: Date;
  updatedAt: Date;
};
