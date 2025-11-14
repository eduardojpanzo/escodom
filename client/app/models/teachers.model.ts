import type { PeopleProps } from "./people.model";

export class TeachersModel {
  static ENDPOINT = "/teachers";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
}

export type TeachersProps = {
  teacherId: string;
  personId: string;
  position: string;
  trainingYear: Date;
  people?: PeopleProps;
  createdAt: Date;
  updatedAt: Date;
};
