import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";
import { Product } from "@prisma/client";
import { z } from "zod";
import { formatter } from "./pos";


const filterProduct = (product: Product) => {
    return {
        id: product.id,
        name: product.name,
        price: formatter.format(product.price),
        categoryId: product.categoryId,
    }
}
export const productRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.product.findMany()
    }),

    getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const product = await ctx.prisma.product.findFirst({
            where: {
                id: input
            }
        })
        if (product) {
            return {
                id: product.id,
                name: product.name,
                price: formatter.format(product.price),
                categoryId: product.categoryId,
            }
        }
    }),

    create: publicProcedure.input(z.object({
        name: z.string().min(1),
        price: z.string().min(1),
        category: z.string().min(1)
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.product.create({
            data: {
                name: input.name,
                price: Number(input.price),
                categoryId: input.category
            }
        })
    }),

    update: publicProcedure.input(z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        price: z.string().min(1),
        categoryId: z.string().min(1),
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.product.update({
            data: {
                id: input.id,
                name: input.name,
                price: Number(input.price),
                categoryId: input.categoryId,
            },

            where: {
                id: input.id
            }
        })
    }),

    delete: publicProcedure.input(z.object({
        id: z.string().min(1)
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.product.delete({
            where: {
                id: input.id
            }
        })
    })
})