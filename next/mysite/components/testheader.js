'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { MenuIcon, XIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = ({ isLoggedIn, user }) => {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const renderThemeChanger = () => {
        if (!mounted) return null;

        const currentTheme = theme === 'system' ? systemTheme : theme;

        if (currentTheme === 'dark') {
            return (
                <SunIcon
                    className="w-6 h-6 text-yellow-500"
                    role="button"
                    onClick={() => setTheme('light')}
                />
            );
        } else {
            return (
                <MoonIcon
                    className="w-6 h-6 text-gray-900"
                    role="button"
                    onClick={() => setTheme('dark')}
                />
            );
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="bg-gray-800 text-white fixed w-full z-10 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a href="/" className="text-xl font-bold">
                                MyLogo
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </a>
                                <a href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    About
                                </a>
                                <a href="/services" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Services
                                </a>
                                <a href="/pricing" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Pricing
                                </a>
                                <a href="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {renderThemeChanger()}
                        {isLoggedIn ? (
                            <div className="relative ml-3">
                                <div>
                                    <button
                                        type="button"
                                        onClick={toggleDropdown}
                                        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={user?.imageUrl}
                                            alt="Profile"
                                        />
                                    </button>
                                </div>
                                {showDropdown && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                        <a
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </a>
                                        <a
                                            href="/logout"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a
                                href="/login"
                                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Login
                            </a>
                        )}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        Home
                    </a>
                    <a href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        About
                    </a>
                    <a href="/services" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        Services
                    </a>
                    <a href="/pricing" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        Pricing
                    </a>
                    <a href="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Header;
