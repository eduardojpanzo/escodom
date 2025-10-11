import { PrismaClient } from "#generated/prisma/index.js";
import { getRequestContext } from "../context/request-context.js";

const basePrisma = new PrismaClient();

export const prisma = basePrisma.$extends({
  query: {
    // Intercepta qualquer modelo
    $allModels: {
      async create({ args, query }) {
        const context = getRequestContext();
        const personId = context?.personId;
        console.log(args, personId);

        if (personId) {
          args.data = {
            ...args.data, // @ts-expect-error
            createdBy: personId, // @ts-expect-error
            updatedBy: personId,
          };
        }

        console.log(args);

        return query(args);
      },

      async update({ args, query }) {
        const context = getRequestContext();
        const personId = context?.personId;

        if (personId) {
          args.data = {
            ...args.data,
            updatedBy: personId,
            updatedAt: new Date(),
          };
        }

        return query(args);
      },
    },
  },
});
