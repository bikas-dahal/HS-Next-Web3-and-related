'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {useSession, signOut} from "next-auth/react";
import {logOut} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";

function Page() {
    // const session = useSession()
    const user = useCurrentUser()

    const onClick = () => {
        logOut()
        // signOut()
    }

    return (
        <div>
            {JSON.stringify(user, null, 2)}
                <Button onClick={onClick} type={"submit"}>Sign Out</Button>

        </div>
    );
}

export default Page;