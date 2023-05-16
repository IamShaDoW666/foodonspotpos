import PosLayout from "@/layouts/PosLayout";
import { useState } from "react";
import { PlusIcon } from '@heroicons/react/20/solid'
import { api } from "@/utils/api";
import Search from "../pos/components/Search";
import PrimaryButton from "@/components/PrimaryButton";
import ProductCard from "../pos/components/ProductCard";
import Spinner from "@/components/Spinner";
import PrimaryLink from "@/components/PrimaryLink";
import Link from "next/link";
const Product = () => {
    const categoriesWithProducts = api.pos.getAllCategoriesWithProducts.useQuery();
    const [search, setSearch] = useState<string>('');
    const filteredProducts = categoriesWithProducts.data?.products.filter((product) => {
        return (
            product.name
                .toLowerCase()
                .indexOf(search.toLowerCase()) != -1
        );
    })
    return (
        <PosLayout>
            <div className="flex flex-col w-full h-full py-4">
                <div className="flex w-full items-center justify-between px-2">
                    <div className="w-3/4">
                        <Search search={search} setSearch={setSearch} products={categoriesWithProducts.data?.products} />
                    </div>
                    <div className="px-4">
                        <PrimaryButton text="Import CSV" classes="text-sm sm:text-base" />
                    </div>
                </div>
                <div className="h-full w-full rounded-3xl px-4 overflow-hidden">
                    <div className="py-4 px-4 text-right flex justify-between">
                        <h1 className="md:text-3xl texl-lg font-semibold text-slate-600">Add New Categories and Products</h1>
                        <PrimaryLink classes="text-sm sm:text-base" href={'/category/create'} text="Add Category" />
                    </div>
                    <div className="bg-white shadow-xl rounded-3xl w-full h-full px-8 py-16 overflow-y-auto">
                        {!search.length ? <>{
                            categoriesWithProducts.isLoading ? <Spinner /> : <div>
                                {categoriesWithProducts.data?.categoriesWithProducts.map((category) => {
                                    return (<section className="pt-4" id={category.name} key={category.id}>
                                        <h1 className="text-center text-xl sm:text-2xl md:text-5xl my-4 py-4 bg-primary rounded-2xl shadow text-white font-semibold">{category.name}</h1>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-4">
                                            {category.products?.map((product) => (
                                                <ProductCard key={product.id} name={product.name} price={product.price.toString()} />
                                            ))}
                                            <Link href={'/product/create/' + category.id}
                                                className="cursor-pointer flex justify-center items-center transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
                                            >
                                                <PlusIcon className="text-primary" width={100} height={100} />
                                            </Link>
                                        </div>
                                    </section>)
                                })}
                            </div>
                        }</> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-4">
                            {filteredProducts?.map((product) => (
                                <ProductCard key={product.id} name={product.name} price={product.price.toString()} />
                            ))}
                        </div>}
                    </div>
                </div>
            </div>
        </PosLayout>
    );
}

export default Product;