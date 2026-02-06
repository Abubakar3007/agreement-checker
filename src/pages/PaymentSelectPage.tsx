import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FileCheck,
  CreditCard,
  Smartphone,
  Building,
  Wallet as WalletIcon,
} from "lucide-react";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { LanguageToggle } from "../components/LanguageToggle";

export const PaymentSelectPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔒 Safe destructuring (no TS)
  const { plan, billingCycle, amount } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // fallback safety
  if (!plan || !billingCycle || !amount) {
    navigate("/plans");
    return null;
  }

  const taxRate = 0.18;
  const taxAmount = Math.round(amount * taxRate);
  const totalAmount = amount + taxAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert(t("payment.select.terms"));
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // 🔁 Simulated payment result
      const paymentSuccess = Math.random() > 0.2;

      if (paymentSuccess) {
        const transactionId =
          "TXN" + Date.now() + Math.random().toString(36).slice(2).toUpperCase();

        navigate("/payment-success", {
          state: {
            transactionId,
            plan,
            amount: totalAmount,
            billingCycle,
          },
        });
      } else {
        navigate("/payment-failed", {
          state: {
            reason: "declined",
            plan,
            amount: totalAmount,
          },
        });
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: "upi", icon: Smartphone, label: t("payment.select.methods.upi") },
    { id: "card", icon: CreditCard, label: t("payment.select.methods.card") },
    {
      id: "netbanking",
      icon: Building,
      label: t("payment.select.methods.netbanking"),
    },
    { id: "wallet", icon: WalletIcon, label: t("payment.select.methods.wallet") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl px-4 py-12 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          {t("payment.select.title")}
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Billing */}
              <Card className="mb-6">
                <h2 className="mb-4 text-xl font-semibold">
                  {t("payment.select.billingDetails")}
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder={t("payment.select.name")}
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />

                  <input
                    type="email"
                    placeholder={t("payment.select.email")}
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />

                  <input
                    type="tel"
                    placeholder={t("payment.select.phone")}
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </Card>

              {/* Payment method */}
              <Card className="mb-6">
                <h2 className="mb-4 text-xl font-semibold">
                  {t("payment.select.paymentMethod")}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 ${selectedMethod === method.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300"
                          }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Terms */}
              <div className="flex items-start mb-6">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-1"
                />
                <span className="ml-2 text-sm">
                  {t("payment.select.terms")}
                </span>
              </div>

              <Button type="submit" size="lg" fullWidth disabled={loading}>
                {loading
                  ? t("payment.select.processing")
                  : t("payment.select.button")}
              </Button>
            </form>
          </div>

          {/* Right */}
          <div>
            <Card className="sticky top-8">
              <h2 className="mb-4 text-xl font-semibold">
                {t("payment.select.orderSummary")}
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{plan.name} Plan</span>
                  <span>₹{amount}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t("payment.select.tax")}</span>
                  <span>₹{taxAmount}</span>
                </div>

                <div className="flex justify-between pt-3 border-t">
                  <strong>{t("payment.select.total")}</strong>
                  <strong className="text-blue-600">₹{totalAmount}</strong>
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                {billingCycle === "monthly"
                  ? "Billed monthly"
                  : "Billed annually"}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
