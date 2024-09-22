'use client'

import React from 'react';
import {logOut} from "@/actions/logout";

interface LogoutButtonProps {
    children?: React.ReactNode
}

function LogoutButton({ children }: LogoutButtonProps) {
    const onClick = () => {
        logOut()
    }

    return (
        <span onClick={onClick} className={'cursor-pointer'}>
            {children}
        </span>
    )
}

export default LogoutButton;