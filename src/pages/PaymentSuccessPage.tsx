import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileCheck, CheckCircle, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';
import { formatDate } from '../utils/formatters';
import type { Plan } from '../types';

export const PaymentSuccessPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { transactionId, plan, amount, validity } = location.state as {
    transactionId: string;
    plan: Plan;
    amount: number;
    validity: Date;
  };

  const handleDownloadReceipt = () => {
    const receipt = `
Payment Receipt
==============

Transaction ID: ${transactionId}
Date: ${new Date().toLocaleDateString('en-IN')}
Plan: ${plan.name}
Amount: ₹${amount}
Valid Until: ${formatDate(new Date(validity).toISOString())}

Thank you for your purchase!
Agreement Checker AI
    `.trim();

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('payment.success.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('payment.success.subtitle')}
          </p>
        </div>

        <Card className="mb-6">
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">{t('payment.success.transactionId')}</span>
              <span className="font-semibold text-gray-900">{transactionId}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">{t('payment.success.plan')}</span>
              <span className="font-semibold text-gray-900">{plan.name}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">{t('payment.success.amount')}</span>
              <span className="font-semibold text-gray-900">₹{amount}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600 font-medium">{t('payment.success.validity')}</span>
              <span className="font-semibold text-gray-900">
                {formatDate(new Date(validity).toISOString())}
              </span>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-2 border-green-200 mb-6">
          <p className="text-gray-700">
            {t('payment.success.message')}
          </p>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            {t('payment.success.receipt')}
          </Button>
          <Link to="/dashboard" className="flex-1">
            <Button size="lg" fullWidth>
              {t('payment.success.dashboard')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
