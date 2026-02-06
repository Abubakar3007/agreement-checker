import { useState } from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, Clock, FileText, ArrowRight, Home, Briefcase, ChevronDown, AlertCircle, ShieldCheck, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate } from "react-router-dom";


export const LandingPage = () => {
  const { t } = useTranslation();
  const points = t("landing.trust.points", { returnObjects: true });

  const faqs = t("landing.faq.items", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute transform top-10 left-10 rotate-12">
            <FileText className="w-32 h-32 text-blue-600" />
          </div>
          <div className="absolute transform top-32 right-20 -rotate-6">
            <FileText className="w-40 h-40 text-blue-600" />
          </div>
          <div className="absolute transform bottom-20 left-1/4 rotate-3">
            <FileText className="text-blue-600 w-36 h-36" />
          </div>
          <div className="absolute transform top-1/2 right-1/3 -rotate-12">
            <FileText className="text-blue-600 w-28 h-28" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-white/50"></div>

        <div className="relative px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
              {t('landing.hero.title')}
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              {t('landing.hero.subtitle')}
            </p>
            <Link to="/upload">
              <Button size="lg" className="px-8 py-4 text-lg">
                {t('landing.hero.cta')}
              </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              {t('landing.hero.features')}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
          {t('landing.howItWorks.title')}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              {t('landing.howItWorks.step1.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.howItWorks.step1.description')}
            </p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              {t('landing.howItWorks.step2.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.howItWorks.step2.description')}
            </p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              {t('landing.howItWorks.step3.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.howItWorks.step3.description')}
            </p>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mb-12 text-2xl font-bold md:text-3xl">
            {t("landing.trust.title")}
          </h2>

          <div className="grid gap-4 text-left md:grid-cols-2">
            {points.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 shadow-sm rounded-xl bg-background"
              >
                <CheckCircle className="w-5 h-5 mt-1 text-success" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
            {t('landing.useCases.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card hover className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('landing.useCases.loan.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.useCases.loan.description')}
              </p>
            </Card>

            <Card hover className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
                <Home className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('landing.useCases.rental.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.useCases.rental.description')}
              </p>
            </Card>

            <Card hover className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('landing.useCases.job.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.useCases.job.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl mx-auto">
          <h2 className="mb-12 text-2xl font-bold text-center md:text-3xl">
            {t("landing.faq.title")}
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border rounded-xl bg-card"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === idx ? null : idx)
                  }
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openIndex === idx ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openIndex === idx && (
                  <div className="px-5 pb-4 text-sm text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {t("landing.finalCta.title")}
          </h2>

          <p className="mb-8 text-primary-foreground/80">
            {t("landing.finalCta.subtitle")}
          </p>

          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate("/upload")}
          >
            {t("landing.finalCta.cta")}
            <ArrowRight className="inline-block w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('landing.disclaimer.title')}
              </h3>
              <p className="mb-4 text-gray-700">
                {t('landing.disclaimer.description')}
              </p>
              <p className="text-gray-700">
                {t('landing.disclaimer.footer')}
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
