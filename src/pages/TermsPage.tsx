import { Link } from 'react-router-dom';
import { FileCheck, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <FileCheck className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Agreement Checker AI</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2024</p>

          <div className="prose prose-blue max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Agreement Checker AI, you accept and agree to be bound by the terms
                and provisions of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Service Description</h2>
              <p className="text-gray-700">
                Agreement Checker AI is an informational tool that analyzes documents and provides summaries
                to help users understand their content. The service does not provide legal advice and should
                not be used as a substitute for professional legal counsel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-2">You agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate information when using our service</li>
                <li>Not upload documents containing illegal content</li>
                <li>Not misuse or attempt to manipulate our service</li>
                <li>Not use our service for any illegal purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Disclaimer of Legal Advice</h2>
              <p className="text-gray-700">
                Agreement Checker AI does not provide legal advice. All analysis and summaries are for
                informational purposes only. For legal matters, you should consult a qualified attorney.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <p className="text-gray-700">
                Agreement Checker AI and its operators shall not be liable for any decisions made based on
                the analysis provided. Users are solely responsible for their decisions regarding documents
                and agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Processing</h2>
              <p className="text-gray-700">
                By using our service, you grant us permission to process your uploaded documents for the
                purpose of providing analysis. We will handle your data in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Service Availability</h2>
              <p className="text-gray-700">
                We strive to maintain service availability but do not guarantee uninterrupted access. We
                reserve the right to modify or discontinue the service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of the service after
                changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
              <p className="text-gray-700">
                If you have questions about these Terms of Service, please contact us through our support channels.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};
