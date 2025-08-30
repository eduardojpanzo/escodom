import {
  IChangePersonDataUseCase,
  ICreatePersonUseCase,
} from "#core/use-cases/people.js";
import {
  createPersonSchema,
  paramsIdentifySchema,
  personUpdateSchema,
} from "#infra/validators/people-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class PeopleController {
  constructor(
    private readonly createPeople: ICreatePersonUseCase,
    private readonly changePersonData: IChangePersonDataUseCase
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = createPersonSchema.parse(req.body);

      const aPerson = await this.createPeople.execute({
        ...bodyData,
      });

      SucessResponse.created(res, aPerson);
    } catch (error) {
      next(error);
    }
  }

  public async updateUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const { personId } = paramsIdentifySchema.parse(req.params);
      const data = personUpdateSchema.parse(req.body);

      const response = await this.changePersonData.execute(personId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }
}
