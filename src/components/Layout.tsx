import { ReactNode } from "react";
import NavBar from "@/components/Navbar";

interface LayoutProps {
    children:ReactNode;
}

export default function Layout({children}:LayoutProps) {
    return(
        <div className="layout">
            <NavBar/>
            {children}
        </div>
    );
};
