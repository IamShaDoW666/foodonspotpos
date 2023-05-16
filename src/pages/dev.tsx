import { api } from "@/utils/api";

const Dev = () => {
    const data = api.pos.getAllCategoriesWithProducts.useQuery()
    return ( 
        <h1>
            {JSON.stringify(data.data)}
        </h1>
     );
}
 
export default Dev;