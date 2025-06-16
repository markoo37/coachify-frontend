import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
    Bars3Icon, 
    XMarkIcon, 
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    HomeIcon,
    UserGroupIcon,
    ChartBarIcon,
    CogIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { token, clearToken } = useAuthStore();

    const handleLogout = () => {
        clearToken();
        navigate('/');
        setIsProfileOpen(false);
    };

    const navigation = [
        { name: 'Home', href: '/', icon: HomeIcon, current: location.pathname === '/' },
        { name: 'Athletes', href: '/athletes', icon: UserGroupIcon, current: location.pathname === '/athletes' },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon, current: location.pathname === '/analytics' },
        { name: 'Settings', href: '/settings', icon: CogIcon, current: location.pathname === '/settings' },
    ];

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                <span className="text-xs font-bold text-white">CFY</span>
                            </div>
                            <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">Coachify</span>
                        </Link>

                        {/* Desktop Navigation - csak bejelentkezett felhasználóknak */}
                        {token && (
                            <div className="hidden md:ml-8 md:flex md:space-x-1">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`
                                                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                                ${item.current
                                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            <Icon className="h-4 w-4 mr-2" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        {token ? (
                            <>
                                {/* Notifications */}
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V7a5 5 0 1110 0v10z" />
                                    </svg>
                                </button>

                                {/* Profile dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <UserCircleIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 hidden sm:block">John Doe</span>
                                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown menu */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">John Doe</p>
                                                <p className="text-sm text-gray-500">john@example.com</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <UserCircleIcon className="h-4 w-4 mr-3" />
                                                Your Profile
                                            </Link>
                                            <Link
                                                to="/settings"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <CogIcon className="h-4 w-4 mr-3" />
                                                Settings
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm"
                                >
                                    Get started
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button - csak bejelentkezett felhasználóknak */}
                        {token && (
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                {isOpen ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu - csak bejelentkezett felhasználóknak */}
            {isOpen && token && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200
                                        ${item.current
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}