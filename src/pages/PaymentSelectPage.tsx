import { useState, FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileCheck, CreditCard, Smartphone, Building, Wallet as WalletIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';
import { supabase } from '../lib/supabase';
import type { Plan, BillingCycle, PaymentMethod } from '../types';

export const PaymentSelectPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, billingCycle, amount } = location.state as {
    plan: Plan;
    billingCycle: BillingCycle;
    amount: number;
  };

  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const taxRate = 0.18;
  const taxAmount = Math.round(amount * taxRate);
  const totalAmount = amount + taxAmount;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert(t('payment.select.terms'));
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const endDate = new Date();
      if (billingCycle === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_id: plan.id,
          status: 'active',
          billing_cycle: billingCycle,
          end_date: endDate.toISOString(),
        })
        .select()
        .single();

      if (subError) throw subError;

      const simulatePayment = Math.random() > 0.2;

      if (simulatePayment) {
        const transactionId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();

        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            user_id: user.id,
            subscription_id: subscription.id,
            amount,
            tax_amount: taxAmount,
            total_amount: totalAmount,
            currency: 'INR',
            payment_method: selectedMethod,
            payment_status: 'completed',
            transaction_id: transactionId,
            completed_at: new Date().toISOString(),
          });

        if (paymentError) throw paymentError;

        navigate('/payment-success', {
          state: {
            transactionId,
            plan,
            amount: totalAmount,
            validity: endDate,
          },
        });
      } else {
        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            user_id: user.id,
            subscription_id: subscription.id,
            amount,
            tax_amount: taxAmount,
            total_amount: totalAmount,
            currency: 'INR',
            payment_method: selectedMethod,
            payment_status: 'failed',
            failure_reason: 'Payment declined by bank',
          });

        if (paymentError) throw paymentError;

        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('id', subscription.id);

        navigate('/payment-failed', {
          state: {
            reason: 'declined',
            plan,
            amount: totalAmount,
          },
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods: { id: PaymentMethod; icon: any; label: string }[] = [
    { id: 'upi', icon: Smartphone, label: t('payment.select.methods.upi') },
    { id: 'card', icon: CreditCard, label: t('payment.select.methods.card') },
    { id: 'netbanking', icon: Building, label: t('payment.select.methods.netbanking') },
    { id: 'wallet', icon: WalletIcon, label: t('payment.select.methods.wallet') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('payment.select.title')}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('payment.select.billingDetails')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('payment.select.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('payment.select.email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('payment.select.phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              <Card className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('payment.select.paymentMethod')}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                          selectedMethod === method.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              <div className="flex items-start mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  {t('payment.select.terms')}
                </label>
              </div>

              <Button type="submit" size="lg" fullWidth disabled={loading || !acceptTerms}>
                {loading ? t('payment.select.processing') : t('payment.select.button')}
              </Button>
            </form>
          </div>

          <div>
            <Card className="sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('payment.select.orderSummary')}
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{plan.name} Plan</span>
                  <span className="font-semibold">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('payment.select.tax')}</span>
                  <span className="font-semibold">₹{taxAmount}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">{t('payment.select.total')}</span>
                  <span className="font-bold text-xl text-blue-600">₹{totalAmount}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {billingCycle === 'monthly' ? 'Billed monthly' : 'Billed annually'}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
