import Sidebar from "@/pages/pos/components/Sidebar";
import { PropsWithChildren } from "react";

const PosLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
            <Sidebar />
            {children}
        </div>
    );
}

export default PosLayout;