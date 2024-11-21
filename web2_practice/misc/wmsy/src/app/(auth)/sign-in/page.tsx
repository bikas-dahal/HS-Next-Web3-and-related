

import React from 'react';
import {SignInCard} from "@/features/auth/components/sign-in-card";
import {redirect} from "next/navigation";
import {getCurrent} from "@/features/auth/actions";

async function SignInPage() {

    const user = await getCurrent()
    
    if (user) {
        redirect('/')
    }

    return (
        <SignInCard />
    );
}

export default SignInPage;