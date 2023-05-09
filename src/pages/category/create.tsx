import PosLayout from "@/layouts/PosLayout";
import PrimaryButton from "@/components/PrimaryButton";
const CategoryCreate = () => {
    const createCategory = () => {
        alert('Create')
    }


    return (
        <PosLayout>
            <div className="h-full w-full rounded-3xl p-4">
                <div className="bg-white shadow-xl rounded-3xl w-full h-full py-8 px-4">
                    <h1 className="font-semibold sm:text-5xl text-center">Add New Category</h1>
                    <div className="max-w-5xl mx-auto">
                        <div className="py-8">
                            <label htmlFor="first-name" className="block text-sm sm:text-3xl font-semibold leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                />
                            </div>
                            <div className="text-right mt-4">
                                <PrimaryButton click={createCategory} text="Create" classes="sm:text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PosLayout>
    );
}

export default CategoryCreate;