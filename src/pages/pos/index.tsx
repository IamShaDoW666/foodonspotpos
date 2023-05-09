import { api } from "@/utils/api";
import type { NextPage } from "next";
import ProductCard from "./components/ProductCard";
import Search from "./components/Search";
import Spinner from "@/components/Spinner";
import CategoriesGhost from "./components/CategoriesGhost";
import { useState } from "react";
import Image from "next/image";
import PosLayout from "@/layouts/PosLayout";
import Head from "next/head";


const Pos: NextPage = () => {
    const categoriesWithProducts = api.pos.getAllCategoriesWithProducts.useQuery()
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
            <Head>
                <title>Food on Spot - POS</title>
                <meta name="title" content="Food on Spot POS" />
                <meta name="description" content="Point of Sale Web Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                <Search search={search} setSearch={setSearch} products={categoriesWithProducts.data?.products} />
                <div className="h-full overflow-hidden mt-4">
                    <div className="h-full overflow-y-auto px-2">
                        {(categoriesWithProducts.data?.products.length === 0) && <div
                            className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25"
                        >
                            <div className="w-full text-center">
                                <Image src="/box.svg" alt="Box" className="mx-auto" height={200} width={200} />
                                <p className="text-xl pt-8">
                                    {"YOU DON'T HAVE ANY PRODUCTS TO SHOW"}
                                </p>
                            </div>
                        </div>}
                        {/* Display Empty Search */}
                        {((search.length != 0) && (filteredProducts?.length != null && filteredProducts.length === 0)) && <div
                            className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25"
                        >
                            <div className="w-full text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p className="text-xl">
                                    EMPTY SEARCH RESULT
                                    <br />
                                </p>
                            </div>
                        </div>}
                        {(categoriesWithProducts.data?.categoriesWithProducts.length != 0) && <section className="bg-white sticky top-0 rounded-2xl shadow-md p-4">
                            {categoriesWithProducts.isLoading ? <CategoriesGhost /> :
                                <div className="flex gap-x-2 overflow-x-auto">
                                    {
                                        categoriesWithProducts.data?.categoriesWithProducts.map((category) => {
                                            return (category.products.length != 0) && <a href={'#' + category.name} className="bg-primary hover:bg-emerald-400 active:bg-primary cursor-pointer text-md sm:text-xl rounded shadow text-white font-bold px-4 py-2">
                                                {category.name}
                                            </a>
                                        })
                                    }
                                </div>
                            }
                        </section>}
                        {!search.length ? <>{
                            categoriesWithProducts.isLoading ? <Spinner /> : <div>
                                {categoriesWithProducts.data?.categoriesWithProducts.map((category) => {
                                    return (category.products.length != 0) && (<section className="pt-[5rem]" id={category.name} key={category.id}>
                                        <h1 className="text-center text-xl sm:text-2xl md:text-5xl my-4 py-4 bg-primary rounded-2xl max-w-xl mx-auto shadow text-white font-semibold">{category.name}</h1>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-4">
                                            {category.products?.map((product) => (
                                                <ProductCard key={product.id} name={product.name} price={product.price.toString()} />
                                            ))}
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
            </div >
        </PosLayout>
    );
}

export default Pos;