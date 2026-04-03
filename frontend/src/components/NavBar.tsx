import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-[#3e3e3e] flex items-center justify-center text-sm font-bold text-white">
                    F
                </div>
                <h1 className="text-lg font-semibold text-[#14CF93] italic">Filezy</h1>
            </div>

            <Button variant="tertiary" className={"text-black px-6 py-1"}>
                <Link to="/login" className="text-sm font-medium">
                    Login
                </Link>
            </Button>
        </nav>
    );
};

export default NavBar;
