'use client'

interface HeaderProps {
    isLoggedIn: boolean;
    user: {
        name: string;
        // Add other user properties as needed
    };
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user }) => {
    return (
        <div>
            Header
        </div>
    )
}

export default Header