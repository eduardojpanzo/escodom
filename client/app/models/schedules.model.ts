import type { ClassesProps } from "./classes.model";
import type { ClassroomsProps } from "./classrooms.model";
import type { TeachersProps } from "./teachers.model";

export class SchedulesModel {
  static ENDPOINT = "/schedules";
  static CREATE = `${this.ENDPOINT}/create`;
  static GETS = `${this.ENDPOINT}/search`;
}

export type SchedulesProps = {
  scheduleId: string;
  teacherId: string;
  classId: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  active: boolean;
  teachers?: TeachersProps;
  classrooms?: ClassroomsProps;
};
