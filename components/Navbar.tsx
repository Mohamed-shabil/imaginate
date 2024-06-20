import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
async function Navbar() {
    return (
        <nav className="hidden sm:flex w-full h-20 container text-slate-800">
            <div className="w-52 h-full flex items-center">
                <h2 className="font-semibold text-xl">
                    <Link href={"/"}>Imaginate</Link>
                </h2>
            </div>
            <div className="flex items-center justify-end w-full gap-3">
                <Link href={"/"} className="text-sm font-medium">
                    Home
                </Link>
                <Link href={"/pricing"} className="text-sm font-medium">
                    Pricing
                </Link>
                <Link href={"/profile"} className="text-sm font-medium">
                    Profile
                </Link>
                <UserButton />
            </div>
        </nav>
    );
}

export default Navbar;
