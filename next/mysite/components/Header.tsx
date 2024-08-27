// components/Navbar.tsx
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, SessionProvider } from 'next-auth/react';

const Navbar: React.FC = () => {
    const session = useSession();
    console.log(session)

    return (
        <SessionProvider>
            <p>Welcome {session?.user?.name}</p>
        </SessionProvider>
    )
}

export default Navbar;
