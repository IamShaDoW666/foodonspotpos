import { SyncLoader } from "react-spinners";

const Spinner = () => {
    return (<div className="flex justify-center items-center w-full h-full">
        <SyncLoader className="flex justify-center items-center w-full h-full" color="#10b981" />
    </div>);
}

export default Spinner;