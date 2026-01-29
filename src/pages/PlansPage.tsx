import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileCheck, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';
import { supabase } from '../lib/supabase';
import type { Plan } from '../types';

export const PlansPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPlanId, setUserPlanId] = useState<string | null>(null);

  useEffect(() => {
    loadPlans();
    checkUserSubscription();
  }, []);

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan_id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) throw error;
      if (data) setUserPlanId(data.plan_id);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleSelectPlan = async (plan: Plan) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    if (plan.name === 'Free') {
      navigate('/dashboard');
      return;
    }

    navigate('/payment-select', {
      state: {
        plan,
        billingCycle,
        amount: billingCycle === 'monthly' ? plan.price_monthly : plan.price_annual,
      },
    });
  };

  const getPlanPrice = (plan: Plan) => {
    return billingCycle === 'monthly' ? plan.price_monthly : plan.price_annual;
  };

  const getPlanCTA = (plan: Plan) => {
    if (plan.id === userPlanId) {
      return t('plans.currentPlan');
    }
    return plan.name === 'Free' ? t('plans.free.cta') :
           plan.name === 'Basic' ? t('plans.basic.cta') :
           t('plans.premium.cta');
  };

  const isPlanCurrent = (plan: Plan) => {
    return plan.id === userPlanId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">{t('common.appName')}</span>
            </Link>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Link to="/dashboard">
                <Button variant="ghost">{t('nav.dashboard')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('plans.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('plans.subtitle')}
          </p>

          <div className="inline-flex items-center bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('plans.billing.monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('plans.billing.annual')}
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {t('plans.billing.save')}
              </span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('common.loading')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative ${
                  index === 1 ? 'border-2 border-blue-500 shadow-xl' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {t('plans.popular')}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{getPlanPrice(plan)}
                    </span>
                    <span className="text-gray-600">
                      {t('plans.free.period')}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {t(`plans.${plan.name.toLowerCase()}.description`)}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  fullWidth
                  variant={index === 1 ? 'primary' : 'outline'}
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isPlanCurrent(plan)}
                >
                  {getPlanCTA(plan)}
                </Button>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16">
          <Card className="bg-blue-50 border-2 border-blue-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can I cancel anytime?
                </h4>
                <p className="text-gray-700">
                  Yes, you can cancel your subscription at any time from your dashboard. Your plan will remain active until the end of your billing period.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-gray-700">
                  We accept UPI, credit/debit cards, net banking, and popular digital wallets for your convenience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can I upgrade or downgrade my plan?
                </h4>
                <p className="text-gray-700">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
