'use client'

import {usePathname} from "next/navigation";
import {NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import useMessageStore from "@/hooks/useMessageStore";

type Props = {
    href?: string
    label?: string
}

export function NavLink({ href, label }: Props) {

    const pathname = usePathname()

    const { unreadCount } = useMessageStore(
        (state) => ({
            unreadCount: state.unreadCount,
        })
    );

    return (
        <NavbarItem isActive={pathname === href} as={Link} href={href}>
            <span>{label}</span>
            {href === "/messages" && (
                <span className="ml-1">
                  ({unreadCount})
                </span>
            )}
        </NavbarItem>
    )
}