'use client'

import {usePathname} from "next/navigation";
import {NavbarItem} from "@nextui-org/react";
import Link from "next/link";

type Props = {
    href?: string
    label?: string
}

export function NavLink({ href, label }: Props) {

    const pathname = usePathname()

    return (
        <NavbarItem isActive={pathname === href} as={Link} href={href}>{label}</NavbarItem>
    )
}