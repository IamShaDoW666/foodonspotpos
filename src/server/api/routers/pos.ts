import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";
import type { Category, Product } from "@prisma/client";
export 
const formatter = new Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency'})
const filter = (category: Category & {products: Product[]}) => {
    return {
        id: category.id,
        name: category.name,  
        products: category.products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatter.format(product.price),
                category: product.categoryId
            }
        })              
    }
}
export const posRouter = createTRPCRouter({
    getAllCategoriesWithProducts: publicProcedure.query(async ({ ctx }) => {
        const categoriesWithProducts  = (await ctx.prisma.category.findMany({
            include: {
                products: true,
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
