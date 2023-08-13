import { createNextApiHandler } from "@trpc/server/adapters/next";
import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import cors from 'nextjs-cors';

// export API handler

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  
  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  })(req, res);
}
