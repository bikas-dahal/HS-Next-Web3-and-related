import React from 'react'
import {Spinner} from "@nextui-org/react";

const Loading = () => {
    return (
        <div className={'flex justify-center items-center'}>
            <Spinner label="Loading..." color={'default'} />
        </div>
    )
}
export default Loading
