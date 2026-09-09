import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../../../../../packages/api/src";
import { createContext } from "../../../../../../../packages/api/src/trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(),
  });

export { handler as GET, handler as POST };
