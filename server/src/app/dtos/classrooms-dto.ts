import { GetClassOutputDto } from "./classes-dto.js";

export type CreateClassRoomInputDto = {
  name: string;
  description: string;
  classId: string;
};

export type GetClassRoomOutputDto = {
  name: string;
  description: string;
  classId: string;
  classes: GetClassOutputDto;
};
