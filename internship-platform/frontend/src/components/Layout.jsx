import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase, LayoutDashboard, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../store/authStore';

const Layout = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'ar', label: 'العربية' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col" dir={i18n.dir()}>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Briefcase className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">InternConnect</span>
                        </Link>
                        <nav className="flex items-center space-x-4">
                            <Link to="/internships" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
                                {t('nav.internships')}
                            </Link>
                            
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium flex items-center">
                                        <LayoutDashboard className="h-4 w-4 mx-1" /> {t('nav.dashboard')}
                                    </Link>
                                    <button onClick={handleLogout} className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md font-medium flex items-center">
                                        <LogOut className="h-4 w-4 mx-1" /> {t('nav.logout')}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
                                        {t('nav.login')}
                                    </Link>
                                    <Link to="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium">
                                        {t('nav.signup')}
                                    </Link>
                                </div>
                            )}

                            <div className="relative ml-4" ref={langRef}>
                                <button 
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                                    aria-expanded={isLangOpen}
                                >
                                    <Globe className="h-5 w-5" />
                                    <span className="uppercase text-sm font-bold">{i18n.language.split('-')[0]}</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {isLangOpen && (
                                    <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={`w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-blue-50 transition-colors duration-150 flex items-center justify-between ${
                                                    i18n.language === lang.code ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-gray-700'
                                                }`}
                                            >
                                                {lang.label}
                                                {i18n.language === lang.code && <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </header>


            
            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} InternConnect. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
