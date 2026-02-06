import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { Faq } from "./pages/FaqPage";
import { UploadPage } from "./pages/UploadPage";
import { ProcessingPage } from "./pages/ProcessingPage";
import { ResultPage } from "./pages/ResultPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { DisclaimerPage } from "./pages/DisclaimerPage";
import { PlansPage } from "./pages/PlansPage";
import { PaymentSelectPage } from "./pages/PaymentSelectPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { PaymentFailedPage } from "./pages/PaymentFailedPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { ContactPage } from "./pages/ContactPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { UseCasesPage } from "./pages/UseCasesPage";
import { VerifyResetPage } from "./pages/VerifyResetPage";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment-select" element={<PaymentSelectPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-failed" element={<PaymentFailedPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/verify-reset" element={<VerifyResetPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;