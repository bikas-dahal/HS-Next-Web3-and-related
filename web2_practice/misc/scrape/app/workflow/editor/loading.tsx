import React from 'react'
import {Loader2} from "lucide-react";

const loading = () => {
    return (
        <div className={'flex h-screen items-center justify-center'}>
            <Loader2 size={30} className={'animate-spin stroke-primary'} />
        </div>
    )
}
export default loading
