import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
function Navbar() {
    return (
        <nav className="hidden sm:flex w-full h-20 container text-slate-800">
            <div className="w-52 h-full flex items-center">
                <h2 className="font-bold text-xl">Logo</h2>
            </div>
            <div className="flex items-center justify-end w-full gap-3">
                <Link href={""} className="font-semibold">
                    Home
                </Link>
                <Link href={""} className="font-semibold">
                    Pricing
                </Link>
                <UserButton />
            </div>
        </nav>
    );
}

export default Navbar;
