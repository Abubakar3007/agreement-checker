import React from 'react';
import { FileCheck } from 'lucide-react';
import { LanguageToggle } from '../LanguageToggle';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { t } = useTranslation();

    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-40 bg-white shadow-sm">
            <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <FileCheck className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">{t('common.appName')}</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {/* <LanguageToggle /> */}
                        <Link to="/plans">
                            <Button variant="ghost">{t('nav.plans')}</Button>
                        </Link>
                        {
                            user ? (
                                <Link to="/dashboard">
                                    <Button variant="ghost">Dashboard</Button>
                                </Link>) : (
                                <Link to="/login">
                                    <Button variant="ghost">{t('nav.login')}</Button>
                                </Link>
                            )
                        }
                        <Link to="/upload">
                            <Button>{t('nav.getStarted')}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;