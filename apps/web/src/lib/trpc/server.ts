import "server-only";
import { appRouter } from "../../../../../packages/api/src";
import { createContext } from "../../../../../packages/api/src/trpc";

export const api = appRouter.createCaller(createContext());
