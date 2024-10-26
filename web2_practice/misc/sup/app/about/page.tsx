import React from 'react';

function Page() {

    const values = [1, 2, 3, 4, 5]

    return (
        <div>{...values.concat([2, 3, 4])}</div>
    );
}

export default Page;