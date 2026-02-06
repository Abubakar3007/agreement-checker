import React from "react";
import { Link } from "react-router-dom";
import { FileCheck } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="py-12 text-white bg-gray-900">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <div className="flex items-center mb-4 space-x-2">
                            <FileCheck className="w-6 h-6" />
                            <span className="font-bold">{t('common.appName')}</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">{t('footer.product')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/upload" className="transition hover:text-white">{t('nav.upload')}</Link></li>
                            <li><Link to="/dashboard" className="transition hover:text-white">{t('nav.dashboard')}</Link></li>
                            <li><Link to="/plans" className="transition hover:text-white">{t('nav.plans')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">{t('footer.legal')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/terms" className="transition hover:text-white">{t('footer.terms')}</Link></li>
                            <li><Link to="/privacy" className="transition hover:text-white">{t('footer.privacy')}</Link></li>
                            <li><Link to="/disclaimer" className="transition hover:text-white">{t('footer.disclaimer')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">{t('footer.support')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/help" className="transition hover:text-white">{t('footer.help')}</Link></li>
                            <li><Link to="/contact" className="transition hover:text-white">{t('footer.contact')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 mt-8 text-sm text-center text-gray-400 border-t border-gray-800">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;