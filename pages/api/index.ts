import { createServer } from "@graphql-yoga/node";
import { join } from "path";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { PrismaClient } from "@prisma/client";

import prisma from "lib/prisma";
import { resolvers } from "graphql/resolvers";

export type GraphQLContext = {
  prisma: PrismaClient;
};

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma,
  };
}

const typeDefs = readFileSync(
  join(process.cwd(), "graphql", "schema.graphql"),
  {
    encoding: "utf-8",
  }
);

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  cors: false,
  endpoint: "/api",
  logging: true,
  schema: {
    typeDefs,
    resolvers,
  },
  context: createContext(),
});

export default server;
