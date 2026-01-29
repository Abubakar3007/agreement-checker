import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileCheck, XCircle, RefreshCw, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';
import type { Plan } from '../types';

export const PaymentFailedPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { reason, plan, amount } = location.state as {
    reason: string;
    plan: Plan;
    amount: number;
  };

  const handleRetry = () => {
    navigate('/plans');
  };

  const getFailureReason = (reason: string) => {
    const reasonMap: Record<string, string> = {
      insufficient: t('payment.failed.reasons.insufficient'),
      declined: t('payment.failed.reasons.declined'),
      timeout: t('payment.failed.reasons.timeout'),
      invalid: t('payment.failed.reasons.invalid'),
    };
    return reasonMap[reason] || t('payment.failed.reasons.unknown');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">{t('common.appName')}</span>
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('payment.failed.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('payment.failed.subtitle')}
          </p>
        </div>

        <Card className="mb-6 bg-red-50 border-2 border-red-200">
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-900">{t('payment.failed.reason')}: </span>
              <span className="text-gray-700">{getFailureReason(reason)}</span>
            </div>
            <div className="pt-3 border-t border-red-300">
              <p className="text-gray-700">
                {t('payment.failed.message')}
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan</span>
              <span className="font-semibold text-gray-900">{plan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-gray-900">₹{amount}</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            size="lg"
            fullWidth
            onClick={handleRetry}
            className="flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {t('payment.failed.retry')}
          </Button>
          <Button
            size="lg"
            fullWidth
            variant="outline"
            onClick={() => navigate('/plans')}
          >
            {t('payment.failed.change')}
          </Button>
          <Button
            size="lg"
            fullWidth
            variant="outline"
            onClick={() => window.location.href = 'mailto:support@agreementchecker.ai'}
            className="flex items-center justify-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            {t('payment.failed.support')}
          </Button>
        </div>
      </div>
    </div>
  );
};
