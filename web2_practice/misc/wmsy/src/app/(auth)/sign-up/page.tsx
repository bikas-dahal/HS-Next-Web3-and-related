

import React from 'react';
import {SignUpCard} from "@/features/auth/components/sign-up-card";
import {redirect} from "next/navigation";
import {getCurrent} from "@/features/auth/queries";

async function SignUpPage() {
    const user = await getCurrent()

    if (user) {
        redirect('/')
    }

    return (
            <SignUpCard />
    );
}

export default SignUpPage;