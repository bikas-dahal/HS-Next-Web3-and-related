const Header = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-pink-300">
            <div className="container">
                <ul className="flex md:justify-between sm:hidden md:block">
                    <div>
                        hi
                    </div>
                    <div className='flex flex-row gap-10 font-'>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                    </div>
                </ul>
                <ul className="flex md:hidden sm:block">
                    <div>
                        hi
                    </div>
                    <div className='flex flex-col gap-10 font-'>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                        <li>Home</li>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Header;