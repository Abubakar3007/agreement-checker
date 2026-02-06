import { Link } from "react-router-dom";
import { ShieldCheck, Brain, Users } from "lucide-react";
import { Button } from "../components/ui/Button";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
        <h1 className="max-w-3xl mx-auto text-4xl font-bold text-gray-900 md:text-5xl">
          Making Agreements Simple, Clear & Risk-Free
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
          Agreement Checker AI helps you understand complex legal documents
          before you sign them — clearly, quickly, and confidently.
        </p>

        <div className="mt-8">
          <Link to="/upload">
            <Button size="lg">
              Try Agreement Checker
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Vision */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 items-center">
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Our Vision
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our vision is to empower everyone — not just lawyers —
              to understand agreements before signing them.
              We believe no one should feel confused, pressured,
              or unaware of risks hidden inside legal documents.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Using AI, we simplify complex clauses into
              plain language so you can make informed decisions.
            </p>
          </div>

          <div className="flex justify-center">
            <Brain className="w-40 h-40 text-blue-600" />
          </div>

        </div>
      </section>

      {/* Why This Exists */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Agreement Checker AI Exists
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600">
            Every day, people sign loan papers, rental agreements,
            job offers, and contracts without fully understanding them.
            This leads to hidden penalties, unfair clauses, and financial loss.
          </p>

          <div className="grid gap-8 mt-12 md:grid-cols-3">
            
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <ShieldCheck className="w-10 h-10 mx-auto text-blue-600" />
              <h3 className="mt-4 text-lg font-semibold">
                Protect Users
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Highlight risks, penalties, and red flags before signing.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <Brain className="w-10 h-10 mx-auto text-blue-600" />
              <h3 className="mt-4 text-lg font-semibold">
                Simplify Legal Language
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Convert complex clauses into easy-to-understand explanations.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <Users className="w-10 h-10 mx-auto text-blue-600" />
              <h3 className="mt-4 text-lg font-semibold">
                Accessible for Everyone
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                No legal background required. Anyone can use it.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Team / Mission */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Mission
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Our mission is simple:
            <span className="font-medium text-gray-900">
              {" "}Transparency before trust.
            </span>
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Agreement Checker AI is built by developers and AI engineers
            who believe technology should protect people —
            not confuse them.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            We do not provide legal advice.
            We provide awareness, clarity, and confidence.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center bg-blue-600">
        <h2 className="text-3xl font-bold text-white">
          Don’t sign blindly. Understand first.
        </h2>
        <p className="mt-4 text-blue-100">
          Upload your agreement and see what really matters.
        </p>

        <div className="mt-8">
          <Link to="/upload">
            <Button variant="secondary" size="lg">
              Upload Document
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};