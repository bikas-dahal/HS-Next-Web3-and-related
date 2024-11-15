"use client";

import { signOutUser } from "@/actions/authAction";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {
    userInfo: {
        name: string | null;
        image: string | null;
    } | null;
};

export default function UserMenu({ userInfo }: Props) {

    // console.log('userinfo', userInfo)
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="default"
                    name={userInfo?.name || "user avatar"}
                    size="sm"
                    src={userInfo?.image || "/images/user.png"}
                />
            </DropdownTrigger>
            <DropdownMenu
                variant="flat"
                aria-label="User actions menu"
            >
                <DropdownSection showDivider>
                    <DropdownItem
                        isReadOnly
                        as="span"
                        className="h-8 flex flex-row text-pink-800"
                        aria-label="username"
                    >
                        {userInfo?.name}
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem
                    as={Link}
                    href="/members/edit"
                >
                    Edit profile
                </DropdownItem>
                <DropdownItem
                    color="danger"
                    onClick={async () => signOutUser()}
                >
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}