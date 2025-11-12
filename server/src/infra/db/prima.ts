import { PrismaClient } from "#generated/prisma/index.js";
import { getRequestContext } from "../context/request-context.js";

const basePrisma = new PrismaClient();

export const prisma = basePrisma.$extends({
  query: {
    $allModels: {
      async create({ args, query }) {
        const context = getRequestContext();
        const personId = context?.personId;

        if (personId) {
          args.data = {
            ...(args.data as any),
            createdBy: (args.data as any)?.createdBy ?? personId,
            updatedBy: personId,
          };
        }

        return query(args);
      },

      async update({ args, query }) {
        const context = getRequestContext();
        const personId = context?.personId;

        if (personId) {
          args.data = {
            ...(args.data as any),
            updatedBy: personId,
            updatedAt: new Date(),
          };
        }

        return query(args);
      },
    },
  },
});

export type PrismaClientExtendType = typeof prisma;
