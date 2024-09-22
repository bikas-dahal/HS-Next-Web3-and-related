import React from 'react';
import {currentUser} from "@/lib/auth";
import {UserInfo} from "@/components/user-info";

async  function Page() {

    const user = await currentUser()
    return (
        <UserInfo user={user} label={'Server Component'}  />
    );
}

export default Page;