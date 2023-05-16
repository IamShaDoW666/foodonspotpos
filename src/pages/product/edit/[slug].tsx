import PosLayout from "@/layouts/PosLayout";
import { useEffect, useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const ProductEdit = () => {
    const router = useRouter();
    const [productId, setProductId] = useState((router.query.slug?.toString()) ?? '');
    const product = api.product.getById.useQuery(productId)
    const categories = api.category.getAll.useQuery();
    const [name, setName] = useState(product.data?.name ?? '');
    const [price, setPrice] = useState(product.data?.price ?? '');
    const [categoryId, setCategoryId] = useState(product.data?.categoryId ?? '');
    const mutation = api.product.update.useMutation({
        onSuccess: () => {
            router.push('/product')
        }
    });

    const createProduct = () => {
        if (typeof productId == 'string') {
            mutation.mutate({ id: productId, name, price, categoryId })
        }
    }

    return (
        <PosLayout>
            <div className="h-full w-full rounded-3xl p-4">
                <div className="bg-white shadow-xl rounded-3xl w-full h-full py-8 px-4">
                    <h1 className="font-semibold sm:text-5xl text-center">Add New Product</h1>
                    <div className="max-w-5xl mx-auto">
                        <div className="py-8">
                            <div>
                                <label htmlFor="first-name" className="block text-sm sm:text-3xl font-semibold leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="first-name" className="block text-sm sm:text-3xl font-semibold leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="first-name" className="block text-sm sm:text-3xl font-semibold leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-4">
                                    <select
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(((categories?.data?.find((c) => c.id === e.target.value))?.id) ?? '')}
                                        className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                    >
                                        {categories.data?.map((category) => (
                                            <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
                            <div className="text-right mt-4">
                                <PrimaryButton click={createProduct} text="Create" classes={'sm:text-2xl'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PosLayout>
    );
}

export default ProductEdit;