import Image from "next/image";
interface Props {
    name: string
    price?: string
}
const ProductCard = ({ name, price }: Props) => {
    return (
        <div className="">
            <div
                className="cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
            >
                <Image className="mx-auto pt-4" src='/box.svg' alt="Product image" width={200} height={300} />
                <div className="flex py-4 px-6 text-sm">
                    <p className="flex-grow text-slate-600 truncate mr-1">{name}</p>
                    <p className="nowrap text-slate-600 font-semibold">{price}</p>
                </div>
            </div>
        </div>
    );
}
export default ProductCard;