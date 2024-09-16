import React from 'react';

function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-300 to-pink-700'>
            {children}
        </div>
    );
}

export default AuthLayout;