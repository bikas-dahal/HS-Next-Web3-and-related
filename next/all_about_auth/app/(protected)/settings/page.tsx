import React from 'react';
import {auth, signOut} from '@/auth'
import {Button} from "@/components/ui/button";

async function Page() {
    const session = await auth()
    return (
        <div>
            {JSON.stringify(session, null, 2)}
            <form onSubmit={async () => {
                'use server'
                await signOut()
            }}>
                <Button type={"submit"}>Sign Out</Button>
            </form>
        </div>
    );
}

export default Page;