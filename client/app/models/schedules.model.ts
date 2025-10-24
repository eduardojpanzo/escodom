import type { ClassesProps } from "./classes.model";
import type { TeachersProps } from "./teachers.model";

export class SchedulesModel {
  static ENDPOINT = "/schedules";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
}

export type SchedulesProps = {
  scheduleId: string;
  teacherId: string;
  teachers?: TeachersProps;
  classId: string;
  classes?: ClassesProps;
  startDate?: Date;
  endDate?: Date;
  active: boolean;
};
