// components/Navbar.tsx
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
import { getSession } from "@/actions/getUser";


const Navbar: React.FC = () => {

    return (

        <nav className="bg-gray-800 p-4">
            {/*{user}*/}
            hi
        </nav>
    );
};

export default Navbar;
