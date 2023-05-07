import { api } from "@/utils/api";
import { NextPage } from "next";
import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";
const Pos: NextPage = () => {    
    return (
        <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
            <Sidebar />
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                <Search />
                <div className="h-full overflow-hidden mt-4">
                    <div className="h-full overflow-y-auto px-2">
                        {/* <div
                            className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25"
                        >
                            <div className="w-full text-center">
                                <Image src='/box.svg' alt="Box" className="mx-auto" height={200} width={200} /> 
                                <p className="text-xl pt-8">
                                    YOU DON'T HAVE
                                    <br />
                                    ANY PRODUCTS TO SHOW
                                </p>
                            </div>
                        </div>
                        <div
                            className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25"                            
                        >
                            <div className="w-full text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p className="text-xl">
                                    EMPTY SEARCH RESULT
                                    <br />
                                    "<span className="font-semibold"></span>"
                                </p>
                            </div>
                        </div> */}
                        <div className="grid grid-cols-4 gap-4 pb-3">
                            {/* Map and render products here */}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Pos;