import {
    createTRPCRouter,
    publicProcedure,    
} from "@/server/api/trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.category.findMany();
    }),

    create: publicProcedure.input(z.object({
        name: z.string().min(1)
    })).mutation(({ctx, input}) => {
        return ctx.prisma.category.create({
            data: {
                name: input.name
            }
        })
    }),

    delete: publicProcedure.input(z.object({
        id: z.string().min(1)
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.category.delete({
            where: {
                id: input.id
            }
        })
    })
});
