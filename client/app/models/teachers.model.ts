import type { PeopleProps } from "./people.model";

export class TeachersModel {
  static ENDPOINT = "/teachers";
  static CREATE = `${this.ENDPOINT}/create`;
  static UPDATE = `${this.ENDPOINT}/updade`;
  static GET = `${this.ENDPOINT}/get`;
  static GETS = `${this.ENDPOINT}/list`;
}

export type TeachersProps = {
  teacherId: string;
  personId: string;
  person: PeopleProps;
  position: string;
  trainingYear: Date;
  createdAt: Date;
  updatedAt: Date;
};
