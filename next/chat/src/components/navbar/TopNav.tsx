import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GiSelfLove } from "react-icons/gi";
import {NavLink} from "./NavLink";
import UserMenu from "@/components/navbar/UserMenu";
import {auth} from "@/auth";

export default async function TopNav() {

    const session = await auth()

    return (
        <Navbar
            maxWidth="full"
            className="bg-gradient-to-r from-pink-800 via-red-700 to-pink-600"
            classNames={{
                item: [
                    "text-xl",
                    "text-white",
                    "capitalize",
                    "data-[active=true]:text-yellow-200",
                ],
            }}
        >
            <NavbarBrand as={Link} href="/">
                <GiSelfLove
                    size={40}
                    className="text-gray-200"
                />
                <div className="font-bold text-3xl flex">
          <span className="text-gray-200">
            Chat
          </span>
                </div>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavLink
                    href="/members"
                    label="Matches"
                />
                <NavLink href="/lists" label="Lists" />
                <NavLink
                    href="/messages"
                    label="Messages"
                />
            </NavbarContent>
            <NavbarContent justify="end">
                {session?.user ? (
                    <UserMenu user={session.user} />
                ) : (
                    <>
                        <Button
                            as={Link}
                            href="/login"
                            variant="bordered"
                            className="text-white"
                        >
                            Login
                        </Button>
                        <Button
                            as={Link}
                            href="/register"
                            variant="bordered"
                            className="text-white"
                        >
                            Register
                        </Button>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
}