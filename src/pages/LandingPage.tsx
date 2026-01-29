import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileCheck, Shield, Clock, FileText, Home, Briefcase, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';

export const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">{t('common.appName')}</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Link to="/plans">
                <Button variant="ghost">{t('nav.plans')}</Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost">{t('nav.login')}</Button>
              </Link>
              <Link to="/upload">
                <Button>{t('nav.getStarted')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 transform rotate-12">
            <FileText className="w-32 h-32 text-blue-600" />
          </div>
          <div className="absolute top-32 right-20 transform -rotate-6">
            <FileText className="w-40 h-40 text-blue-600" />
          </div>
          <div className="absolute bottom-20 left-1/4 transform rotate-3">
            <FileText className="w-36 h-36 text-blue-600" />
          </div>
          <div className="absolute top-1/2 right-1/3 transform -rotate-12">
            <FileText className="w-28 h-28 text-blue-600" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-white/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('landing.hero.subtitle')}
            </p>
            <Link to="/upload">
              <Button size="lg" className="text-lg px-8 py-4">
                {t('landing.hero.cta')}
              </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              {t('landing.hero.features')}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t('landing.howItWorks.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('landing.howItWorks.step1.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.howItWorks.step1.description')}
            </p>
          </Card>

          <Card className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('landing.howItWorks.step2.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.howItWorks.step2.description')}
            </p>
          </Card>

          <Card className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('landing.howItWorks.step3.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.howItWorks.step3.description')}
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('landing.useCases.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('landing.useCases.loan.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.useCases.loan.description')}
              </p>
            </Card>

            <Card hover className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('landing.useCases.rental.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.useCases.rental.description')}
              </p>
            </Card>

            <Card hover className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('landing.useCases.job.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.useCases.job.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('landing.disclaimer.title')}
              </h3>
              <p className="text-gray-700 mb-4">
                {t('landing.disclaimer.description')}
              </p>
              <p className="text-gray-700">
                {t('landing.disclaimer.footer')}
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileCheck className="w-6 h-6" />
                <span className="font-bold">{t('common.appName')}</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/upload" className="hover:text-white transition">{t('nav.upload')}</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition">{t('nav.dashboard')}</Link></li>
                <li><Link to="/plans" className="hover:text-white transition">{t('nav.plans')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/terms" className="hover:text-white transition">{t('footer.terms')}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition">{t('footer.privacy')}</Link></li>
                <li><Link to="/disclaimer" className="hover:text-white transition">{t('footer.disclaimer')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">{t('footer.help')}</a></li>
                <li><a href="#" className="hover:text-white transition">{t('footer.contact')}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
