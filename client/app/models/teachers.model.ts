import type { PeopleProps } from "./people.model";

export class TeachersModel {
  static ENDPOINT = "/teachers";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
}

export type TeachersProps = {
  teacherId: string;
  personId: string;
  people: PeopleProps;
  position: string;
  trainingYear: Date;
  createdAt: Date;
  updatedAt: Date;
};
