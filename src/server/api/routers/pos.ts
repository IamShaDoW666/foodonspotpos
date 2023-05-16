import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";
import type { Category, Product, Option, Variant } from "@prisma/client";
export
    const formatter = new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency', minimumFractionDigits: 0, maximumFractionDigits: 2 })
const filter = (category: Category & {
    products: (Product & {
        options: (Option & {
            variants: Variant[];
        })[];
    })[];
}) => {
    return {
        id: category.id,
        name: category.name,
        products: category.products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatter.format(product.price),
                category: product.categoryId,
                options: product.options.map((option) => {
                    return {
                        id: option.id,
                        name: option.name,
                        variants: option.variants.map((variant) => {
                            return {
                                id: variant.id,
                                name: variant.name,
                                price: variant.price
                            }
                        })
                    }
                })
            }
        })
    }
}
export const posRouter = createTRPCRouter({
    getAllCategoriesWithProducts: publicProcedure.query(async ({ ctx }) => {
        const categoriesWithProducts = (await ctx.prisma.category.findMany({
            include: {
                products: {
                    include: {
                        options: {
                            include: {
                                variants: true
                            }
                        }
                    }
                }
            }
        })).map(filter);

        const products = categoriesWithProducts.map((e) => [
            e.products
        ]).flat().flat()

        return {
            categoriesWithProducts,
            products
        };
    }),
});
