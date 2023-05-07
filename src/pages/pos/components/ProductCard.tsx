import Image from "next/image";
interface Props {
    name: String
    price?: String
}
const ProductCard = ({ name, price }: Props) => {
    return (
        <div className="">
            <div
                className="cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
            >
                <Image className="mx-auto pt-4" src='/box.svg' alt="Product image" width={200} height={300} />
                <div className="flex py-4 px-2 text-sm bg-red-300">
                    <p className="flex-grow truncate mr-1">{name}</p>
                    <p className="nowrap font-semibold">{price}</p>
                </div>
            </div>
        </div>
    );
}
export default ProductCard;