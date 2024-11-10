import React from 'react'

const Navbar = () => {

    const navItems = ['courses', 'test', 'abv', 'xyzz']

    return (
        <div className={'flex justify-between mt-4 mx-28'}>
            <div className={'flex gap-x-5'}>
                <div className={'text-2xl'}>Logo</div>
                <div className={'flex gap-x-5 text-xl'}>
                    {navItems.map((item, i) => (
                        <div key={i}>item</div>
                    ))}
                </div>
            </div>
            <div className={'flex items-center gap-x-5 text-xl'}>
                <div className={'border-2 p-2 rounded-full border-blue-200 bg-blue-400'}>Contact</div>
                <div>Login</div>
            </div>

        </div>
    )
}
export default Navbar
