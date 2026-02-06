import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileCheck, Check } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { LanguageToggle } from "../components/LanguageToggle";

export const PlansPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "free",
      name: "Free",
      price_monthly: 0,
      price_annual: 0,
      features: ["1 document / month", "Basic summary", "Standard support", "7-day history"],
    },
    {
      id: "basic",
      name: "Basic",
      price_monthly: 199,
      price_annual: 1999,
      features: ["25 documents per month",
        "Advanced analysis",
        "Priority support",
        "30-day history",
        "Download reports",
        "No watermarks"],
    },
    {
      id: "premium",
      name: "Premium",
      price_monthly: 499,
      price_annual: 4999,
      features: [
        "Unlimited documents",
        "Advanced AI analysis",
        "24/7 Priority support",
        "Unlimited history",
        "Download & share reports",
        "API access",
        "Custom templates",
        "Team collaboration"
      ],
    },
  ];

  const getPrice = (plan) =>
    billingCycle === "monthly" ? plan.price_monthly : plan.price_annual;

  const handleSelectPlan = (plan) => {
    if (plan.name === "Free") {
      navigate("/dashboard");
      return;
    }

    navigate("/payment-select", {
      state: {
        plan,
        billingCycle,
        amount: getPrice(plan),
      },
    });
  };

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Choose Your Plan</h1>
        <p className="mb-6 text-gray-600">
          Select the perfect plan for your document analysis needs
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex p-1 bg-white rounded-lg shadow-sm">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-lg ${billingCycle === "monthly"
              ? "bg-blue-600 text-white"
              : "text-gray-700"
              }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-6 py-2 rounded-lg ${billingCycle === "annual"
              ? "bg-blue-600 text-white"
              : "text-gray-700"
              }`}
          >
            Annual
            <span className="px-2 py-1 ml-2 text-xs text-green-700 bg-green-100 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid gap-8 px-4 mx-auto max-w-7xl md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={plan.id}
            className={index === 1 ? "border-2 border-blue-500" : ""}
          >
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
              <div className="mb-2 text-4xl font-bold">
                ₹{getPrice(plan)}
              </div>
              <p className="text-gray-600">
                {billingCycle === "monthly" ? "per month" : "per year"}
              </p>
            </div>

            <ul className="mb-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              fullWidth
              variant={index === 1 ? "primary" : "outline"}
              onClick={() => handleSelectPlan(plan)}
            >
              {plan.name === "Free" ? "Get Started" : "Choose Plan"}
            </Button>
          </Card>
        ))}
      </div>

      <div className="max-w-7xl px-4 mx-auto mt-16">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Can I cancel anytime?
              </h4>
              <p className="text-gray-700">
                Yes, you can cancel your subscription at any time from your dashboard. Your plan will remain active until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-700">
                We accept UPI, credit/debit cards, net banking, and popular digital wallets for your convenience.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
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
  );
};
