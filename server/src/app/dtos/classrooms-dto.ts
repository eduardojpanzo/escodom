import { ClassroomsProps } from "#core/entities/classrooms.js";
import { GetClassOutputDto } from "./classes-dto.js";

export type CreateClassRoomInputDto = Omit<
  ClassroomsProps,
  "classroomId" | "createdAt" | "updatedAt"
>;

export type GetClassRoomOutputDto = ClassroomsProps & {
  classes: GetClassOutputDto;
};
