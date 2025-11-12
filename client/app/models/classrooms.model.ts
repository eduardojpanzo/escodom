import type { ClassesProps } from "./classes.model";

export class ClassroomsModel {
  static ENDPOINT = "/classrooms";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
}

export type ClassroomsProps = {
  classroomId: string;
  name: string;
  description?: string;
  classId: string;
  classes: ClassesProps;
  createdAt: Date;
  updatedAt: Date;
};
