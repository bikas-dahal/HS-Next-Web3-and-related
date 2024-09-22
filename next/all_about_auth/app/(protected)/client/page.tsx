'use client'

import React from 'react';
import {currentUser} from "@/lib/auth";
import {UserInfo} from "@/components/user-info";
import {useCurrentUser} from "@/hooks/use-current-user";

function Page() {

    const user = useCurrentUser()
    return (
        <UserInfo user={user} label={'Client Component'}  />
    );
}

export default Page;