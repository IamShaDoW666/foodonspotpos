import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { categoryRouter } from "./routers/category";
import { posRouter } from "./routers/pos";
import { productRouter } from "./routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  category: categoryRouter,
  pos: posRouter,
  product: productRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
